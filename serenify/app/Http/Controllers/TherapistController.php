<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
class TherapistController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (!Auth::user()->isTherapist()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return $next($request);
        });
    }

    /**
     * Get therapist dashboard data
     * Returns data needed for the therapist dashboard view
     */
    public function dashboard()
    {
        try {
            $user = Auth::user();
            
            // Get appointments with patients
            $appointments = $user->therapistAppointments()
                ->with('patient')
                ->get()
                ->map(function($appointment) {
                    // Format the appointment data to match frontend expectations
                    $status = $this->mapAppointmentStatus($appointment->status);
                    $date = Carbon::parse($appointment->date)->format('j M Y');
                    $time = Carbon::parse($appointment->time)->format('H:i');
                    
                    return [
                        'id' => $appointment->id,
                        'name' => $appointment->patient->name,
                        'appointmentType' => $appointment->type, // 'Vidéoconférence', 'Chat', etc.
                        'appointmentDate' => $date,
                        'appointmentTime' => $time,
                        'status' => $status, // 'scheduled', 'in-waiting-room', 'active', 'completed'
                        'patient_id' => $appointment->patient_id,
                        'notes' => $appointment->notes
                    ];
                });
            
            // Calculate statistics
            $totalAppointments = $user->therapistAppointments()->count();
            $completedSessions = $user->therapistAppointments()->where('status', 'completed')->count();
            
            return response()->json([
                'patients' => $appointments,
                'stats' => [
                    'total_appointments' => $totalAppointments,
                    'completed_sessions' => $completedSessions,
                ],
                'therapist' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'isOnline' => $user->is_online, // Make sure this field exists in your User model
                    'specialty' => $user->specialty
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error in therapist dashboard: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Set therapist online status
     */
    public function updateOnlineStatus(Request $request)
    {
        try {
            $validated = $request->validate([
                'isOnline' => 'required|boolean'
            ]);
            
            $user = Auth::user();
            $user->is_online = $validated['isOnline'];
            $user->save();
            
            return response()->json([
                'success' => true,
                'isOnline' => $user->is_online
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating online status: ' . $e->getMessage());
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Start a video or phone call with a patient
    //  */
    
public function startVideoCall(Request $request, Appointment $appointment)
{
    try {
        if ($appointment->therapist_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'callType' => 'required|in:video,phone'
        ]);

        if ($validated['callType'] === 'video') {
            // Générer un nom unique pour la room (par exemple, basé sur l'ID du rendez-vous)
            $roomName = 'appointment_' . $appointment->id;

            // Récupérer les identifiants Twilio depuis .env
            $accountSid = env('TWILIO_ACCOUNT_SID');
            $apiKeySid = env('TWILIO_API_KEY');
            $apiKeySecret = env('TWILIO_API_SECRET');

            // Générer un token d'accès Twilio
            $token = new AccessToken(
                $accountSid,
                $apiKeySid,
                $apiKeySecret,
                3600, // durée de validité du token en secondes (ici 1 heure)
                Auth::user()->name // identité de l'utilisateur dans la room
            );

            // Ajouter la capacité Video au token
            $videoGrant = new VideoGrant();
            $videoGrant->setRoom($roomName);
            $token->addGrant($videoGrant);

            $jwt = $token->toJWT();

            // Enregistrer le lien (ici on enregistre juste le nom de la room)
            $appointment->update([
                'video_call_link' => $roomName,
                'call_type' => 'video',
                'status' => 'active'
            ]);

            return response()->json([
                'room_name' => $roomName,
                'token' => $jwt,
                'message' => 'Video call started successfully',
                'appointment' => [
                    'id' => $appointment->id,
                    'status' => 'active'
                ]
            ]);
        }
    } catch (\Exception $e) {
        Log::error('Error starting call: ' . $e->getMessage());
        return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
    }
}
    // public function startCall(Request $request, Appointment $appointment)
    // {
    //     try {
    //         if ($appointment->therapist_id !== Auth::id()) {
    //             return response()->json(['message' => 'Unauthorized'], 403);
    //         }

    //         $validated = $request->validate([
    //             'callType' => 'required|in:video,phone'
    //         ]);

    //         // In a real app, you would generate a unique call link here
    //         // For example using a service like Twilio, Zoom, or Jitsi
    //         $callLink = 'https://meet.example.com/' . uniqid();

    //         $appointment->update([
    //             'call_link' => $callLink,
    //             'call_type' => $validated['callType'],
    //             'status' => 'active' // Change status to active
    //         ]);

    //         return response()->json([
    //             'call_link' => $callLink,
    //             'message' => 'Call started successfully',
    //             'appointment' => [
    //                 'id' => $appointment->id,
    //                 'status' => 'active'
    //             ]
    //         ]);
    //     } catch (\Exception $e) {
    //         Log::error('Error starting call: ' . $e->getMessage());
    //         return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
    //     }
    // }

    /**
     * End an active call
     */
    public function endCall(Appointment $appointment)
    {
        try {
            if ($appointment->therapist_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            if ($appointment->status !== 'active') {
                return response()->json(['message' => 'This appointment is not currently active'], 400);
            }

            $appointment->update([
                'status' => 'completed',
                'completed_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Call ended successfully',
                'appointment' => [
                    'id' => $appointment->id,
                    'status' => 'completed'
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error ending call: ' . $e->getMessage());
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update appointment details
     */
    public function updateAppointment(Appointment $appointment, Request $request)
    {
        try {
            if ($appointment->therapist_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $validated = $request->validate([
                'notes' => 'nullable|string',
                'status' => 'sometimes|in:scheduled,in-waiting-room,active,completed,cancelled'
            ]);

            $appointment->update($validated);

            return response()->json([
                'success' => true,
                'appointment' => $appointment
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating appointment: ' . $e->getMessage());
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * List all therapists (public endpoint)
     */
    public function index()
    {
        return response()->json(
            User::where('role', 'therapist')
                ->where('is_active', true)
                ->withCount(['therapistAppointments as completed_sessions' => fn($q) => 
                    $q->where('status', 'completed')
                ])
                ->get()
                ->map(function($therapist) {
                    return [
                        'id' => $therapist->id,
                        'name' => $therapist->name,
                        'specialty' => $therapist->specialty,
                        'experience' => $therapist->experience,
                        'bio' => $therapist->bio ?? '',
                        'avatarUrl' => $therapist->avatar_url ?? '/assets/default-avatar.png',
                        'availability' => $this->getTherapistAvailability($therapist),
                        'completed_sessions' => $therapist->completed_sessions
                    ];
                })
        );
    }
/**
 * List all therapists (public endpoint)
 */
//  public function index()
//     {
//         try {
//             // Debugging: Log the start of the method
//             Log::info('Therapists Index Method Started');

//             // Retrieve therapists with comprehensive query
//             $therapists = User::where('role', 'therapist')
//                 ->select([
//                     'id', 
//                     'name', 
//                     'email', 
//                     'role', 
//                     'specialty', 
//                     'experience', 
//                     'bio', 
//                     'avatar'
//                 ])
//                 ->get();

//             // Detailed logging
//             Log::info('Total Therapists Retrieved: ' . $therapists->count());

//             // Prepare therapist list with appointment counts
//             $therapistsList = $therapists->map(function($therapist) {
//                 // Count completed appointments with explicit query
//                 $completedAppointmentsCount = DB::table('appointments')
//                     ->where('therapist_id', $therapist->id)
//                     ->where('status', 'completed')
//                     ->count();

//                 // Total appointments
//                 $totalAppointmentsCount = DB::table('appointments')
//                     ->where('therapist_id', $therapist->id)
//                     ->count();

//                 // Detailed logging for each therapist
//                 Log::info("Therapist {$therapist->id} Details:", [
//                     'name' => $therapist->name,
//                     'completed_appointments' => $completedAppointmentsCount,
//                     'total_appointments' => $totalAppointmentsCount
//                 ]);

//                 return [
//                     'id' => $therapist->id,
//                     'name' => $therapist->name,
//                     'email' => $therapist->email,
//                     'specialty' => $therapist->specialty ?? 'Not specified',
//                     'experience' => $therapist->experience ?? 'Not specified',
//                     'bio' => $therapist->bio ?? '',
//                     'avatarUrl' => $therapist->avatar ?? '/assets/default-avatar.png',
//                     'completed_sessions' => $completedAppointmentsCount,
//                     'total_appointments' => $totalAppointmentsCount,
//                     // Add any other relevant fields
//                 ];
//             });

//             // Log the final list before returning
//             Log::info('Therapists List Prepared', [
//                 'count' => $therapistsList->count()
//             ]);

//             return response()->json($therapistsList);

//         } catch (\Exception $e) {
//             // Comprehensive error logging
//             Log::error('Therapists Index Method Error', [
//                 'message' => $e->getMessage(),
//                 'trace' => $e->getTraceAsString()
//             ]);
            
//             return response()->json([
//                 'message' => 'Error retrieving therapists',
//                 'error' => [
//                     'message' => $e->getMessage(),
//                     'trace' => $e->getTraceAsString()
//                 ]
//             ], 500);
//         }
//     }

    /**
     * Show a specific therapist (public endpoint)
     */
    public function show(User $therapist)
    {
        try {
            // Validate therapist role
            if (!$therapist->isTherapist()) {
                return response()->json(['message' => 'Not a therapist'], 404);
            }

            // Count completed sessions using DB query
            $completedSessions = DB::table('appointments')
                ->where('therapist_id', $therapist->id)
                ->where('status', 'completed')
                ->count();
            
            // Total appointments
            $totalAppointments = DB::table('appointments')
                ->where('therapist_id', $therapist->id)
                ->count();

            return response()->json([
                'id' => $therapist->id,
                'name' => $therapist->name,
                'specialty' => $therapist->specialty ?? 'General Therapy',
                'experience' => $therapist->experience ?? 'Not specified',
                'bio' => $therapist->bio ?? '',
                'avatarUrl' => $therapist->avatar ?? '/assets/default-avatar.png',
                'completed_sessions' => $completedSessions,
                'total_appointments' => $totalAppointments
            ]);
        } catch (\Exception $e) {
            Log::error('Error in therapist show: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error retrieving therapist',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Helper method to map database appointment status to frontend status
     */
    private function mapAppointmentStatus($dbStatus)
    {
        $statusMap = [
            'pending' => 'scheduled',
            'confirmed' => 'scheduled',
            'in_progress' => 'active',
            'in_waiting_room' => 'in-waiting-room',
            'active' => 'active',
            'completed' => 'completed',
            'cancelled' => 'cancelled'
        ];
        
        return $statusMap[$dbStatus] ?? 'scheduled';
    }

    /**
     * Helper method to get therapist availability
     */
    private function getTherapistAvailability($therapist)
    {
        // In a real app, this would come from a database
        // For example, a therapist_availabilities table
        // This is just a placeholder
        return ['Lundi', 'Mercredi', 'Vendredi'];
    }
}