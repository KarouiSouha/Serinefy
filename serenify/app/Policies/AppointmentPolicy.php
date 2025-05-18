<?php

namespace App\Policies;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\ Auth;        
        class AppointmentPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Appointment $appointment)
    {
        return $user->id === $appointment->patient_id || $user->id === $appointment->therapist_id;
    }

    public function update(User $user, Appointment $appointment)
    {
        return $user->id === $appointment->patient_id || $user->id === $appointment->therapist_id;
    }
    

 /*   public function update(User $user, Appointment $appointment)
    {
        // Log the update authorization check for debugging
        Log::info('Checking update permission', [
            'user_id' => $user->id,
            'appointment_id' => $appointment->id,
            'patient_id' => $appointment->patient_id,
            'therapist_id' => $appointment->therapist_id
        ]);

        return $user->id === $appointment->patient_id || $user->id === $appointment->therapist_id;
    }
*/
 /*   public function delete(User $user, Appointment $appointment)
    {
        // Log the delete authorization check
        Log::info('Checking delete permission', [
            'user_id' => $user->id,
            'appointment_id' => $appointment->id,
            'patient_id' => $appointment->patient_id
        ]);
        
        // Only allow the patient who owns this specific appointment to delete it
        return $user->id === $appointment->patient_id;
    }
*/

    public function delete(User $user, Appointment $appointment)
    {
        // Log the delete authorization check
        Log::info('Checking delete permission', [
            'user_id' => $user->id,
            'appointment_id' => $appointment->id,
            'patient_id' => $appointment->patient_id
        ]);
        
        // Only allow the patient who owns this specific appointment to delete it
        return $user->id === $appointment->patient_id;
    }
}