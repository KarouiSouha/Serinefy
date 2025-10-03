<?php

namespace App\Http\Controllers;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
class AppointmentController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $query = Appointment::with($user->isTherapist() ? 'patient' : 'therapist')
            ->where($user->isTherapist() ? 'therapist_id' : 'patient_id', $user->id)
            ->orderBy('appointment_date', 'desc');

        return response()->json($query->get());
    }

    /*public function store(Request $request)
    {
        $validated = $request->validate([
            'therapist_id' => [
                'required',
                Rule::exists('users', 'id')->where(function ($query) {
                    $query->where('role', 'therapist');
                })
            ],
            'appointment_date' => 'required|date_format:Y-m-d H:i:s',
            'type' => 'required|in:video,in_person',
            'duration' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
        ]);
    
        $appointment = Appointment::create([
            'patient_id' => Auth::id(),
            ...$validated,
            'status' => 'pending'
        ]);
    
        return response()->json($appointment, 201);
        
//     }*/

 public function store(Request $request)
    {
        $validated = $request->validate([
            'therapist_id' => [
                'required',
                Rule::exists('users', 'id')->where(function ($query) {
                    $query->where('role', 'therapist');
                })
            ],
            'appointment_date' => 'required|date_format:Y-m-d H:i:s',
            'type' => 'required|in:video,in_person',
            'duration' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
        ]);
    
        $appointment = Appointment::create([
            'patient_id' => Auth::id(),
            'therapist_id' => $validated['therapist_id'],
            'appointment_date' => $validated['appointment_date'],
            'type' => $validated['type'],
            'duration' => $validated['duration'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending'
        ]);
        
        // Charger les relations pour la réponse
        $appointment->load(['therapist', 'patient']);
    
        return response()->json([
            'success' => true,
            'appointment' => $appointment,
            'message' => 'Rendez-vous créé avec succès'
        ], 201);
    }
    
//     public function store(Request $request)
// {
//     try {
//         Log::info('Test de la méthode store', ['user_id' => Auth::id()]);
        
//         // Renvoyer une réponse simple pour tester si la méthode est accessible
//         return response()->json(['message' => 'Test OK'], 200);
//     } catch (\Exception $e) {
//         Log::error('Exception dans store', [
//             'message' => $e->getMessage(),
//             'line' => $e->getLine(),
//             'file' => $e->getFile()
//         ]);
        
//         return response()->json([
//             'error' => $e->getMessage(),
//             'file' => $e->getFile(),
//             'line' => $e->getLine()
//         ], 500);
//     }
// }

    
    public function show(Appointment $appointment)
    {
        $this->authorize('view', $appointment);
        return response()->json($appointment->load(['therapist', 'patient']));
    }

   /* public function update(Request $request, Appointment $appointment)
    {
        $this->authorize('update', $appointment);

        $validated = $request->validate([
            'appointment_date' => 'sometimes|date_format:Y-m-d H:i:s',
            'status' => 'sometimes|in:pending,confirmed,cancelled,completed',
            'notes' => 'sometimes|nullable|string|max:500',
        ]);

        $appointment->update($validated);

        return response()->json($appointment);
    }*/
    public function update(Request $request, Appointment $appointment)
    {
        Log::info('Début update', [
            'appointment_id' => $appointment->id,
            // on supprime Auth::id() car on n’utilise pas auth

        ]);
    
        // On COMENTE ou SUPPRIME l’autorisation
         //$this->authorize('update', $appointment);
    
        // Validation
        $validated = $request->validate([
            'appointment_date' => 'required|date_format:Y-m-d H:i:s',
        ]);
        Log::info('Données validées', ['validated' => $validated]);
    
        // Mise à jour
        $appointment->update($validated);
        Log::info('Rendez-vous mis à jour', [
            'appointment_id' => $appointment->id,
            'new_date' => $validated['appointment_date']
        ]);
    
        return response()->json($appointment->fresh(), 200);
    }

    
    /**
     * Reschedule an appointment (alternative endpoint)

     */
    public function reschedule(Request $request, Appointment $appointment)
    {
        Log::info('Début reschedule', [
            'appointment_id' => $appointment->id,
        ]);

        // Validation
        $validator = Validator::make($request->all(), [
            'date' => 'required|date_format:Y-m-d',
            'time' => 'sometimes|required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            Log::error('Validation error', ['errors' => $validator->errors()->toArray()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        Log::info('Données validées', ['validated' => $validated]);

        // Format appointment_date
        $appointmentDate = $validated['date'];
        if (isset($validated['time'])) {
            $appointmentDate .= ' ' . $validated['time'];
        } else {
            // Use the existing time part if no new time is provided
            $currentDateTime = explode(' ', $appointment->appointment_date);
            $currentTime = $currentDateTime[1] ?? '00:00:00';
            $appointmentDate .= ' ' . $currentTime;
        }

        // Update the appointment
        $appointment->update([
            'appointment_date' => $appointmentDate
        ]);
        
        Log::info('Rendez-vous reprogrammé', [
            'appointment_id' => $appointment->id,
            'new_date' => $appointmentDate
        ]);

        return response()->json([
            'success' => true,
            'appointment' => $appointment->fresh(),
            'message' => 'Rendez-vous reprogrammé avec succès'
        ], 200);
    }

        public function destroy(Appointment $appointment)
{
    // Vérifie si l'appointment appartient à l'utilisateur connecté
    if ($appointment->user_id !== auth()->id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    $appointment->delete();

    return response()->json(null, 204);
}
public function getVideoToken(Appointment $appointment)
{
    if ($appointment->patient_id !== Auth::id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $roomName = $appointment->video_call_link;

    if (empty($roomName)) {
        return response()->json(['message' => 'Call has not been started yet'], 400);
    }

    $token = new AccessToken(
        env('TWILIO_ACCOUNT_SID'),
        env('TWILIO_API_KEY'),
        env('TWILIO_API_SECRET'),
        3600,
        Auth::user()->name
    );

    $videoGrant = new VideoGrant();
    $videoGrant->setRoom($roomName);
    $token->addGrant($videoGrant);

    return response()->json([
        'room_name' => $roomName,
        'token' => $token->toJWT()
    ]);
}
public function patientEndCall(Appointment $appointment)
{
    try {
        // Vérifier que l'utilisateur actuel est bien le patient de ce rendez-vous
        if ($appointment->patient_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Vérifier que l'appel est actif
        if ($appointment->status !== 'active') {
            return response()->json(['message' => 'This appointment is not currently active'], 400);
        }

        // Mettre à jour le statut du rendez-vous
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
        Log::error('Error patient ending call: ' . $e->getMessage());
        return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
    }
}

}