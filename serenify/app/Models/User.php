<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar',
        'bio',
        'specialty',
        'experience'

        
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relation avec les rendez-vous en tant que patient
    public function appointments()
    {
        if ($this->isTherapist()) {
            return $this->therapistAppointments();
        } else {
            return $this->patientAppointments();
        }
    }

    public function therapistAppointments()
    {
        return $this->hasMany(Appointment::class, 'therapist_id');
    }
    
    public function patientAppointments()
    {
        return $this->hasMany(Appointment::class, 'patient_id');
    }
    
    // Relation avec les entrées d'humeur
    public function moodEntries()
    {
        return $this->hasMany(MoodEntry::class);
    }

    // Vérifie si l'utilisateur est un thérapeute
    public function isTherapist()
    {
        return $this->role === 'therapist';
    }

    // Vérifie si l'utilisateur est un patient
    public function isPatient()
    {
        return $this->role === 'patient';
    }
    public function upcomingAppointments()
    {
        return $this->appointments()
            ->where('status', 'scheduled')
            ->where('appointment_date', '>=', now())
            ->orderBy('appointment_date');
    }

    public function pastAppointments()
    {
        return $this->appointments()
            ->where(function($q) {
                $q->where('status', 'completed')
                  ->orWhere('appointment_date', '<', now());
            })
            ->orderByDesc('appointment_date');
    }
}