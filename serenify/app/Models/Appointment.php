<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'therapist_id',
        'appointment_date',
        'duration',
        'type',
        'status',
        'notes',
        'video_call_link'
    ];

    protected $casts = [
        'appointment_date' => 'datetime',
    ];
// Base appointment relationship - THIS IS THE MISSING METHOD
public function appointments()
{
    // If user is therapist, get therapist appointments
    // If user is patient, get patient appointments
    if ($this->isTherapist()) {
        return $this->therapistAppointments();
    } else {
        return $this->patientAppointments();
    }
}

    // Relation avec le patient
   public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    // Relation avec le thérapeute
    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }
}
