<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MoodEntryController;
use App\Http\Controllers\TherapistController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PublicTherapistController;

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Appointments
    Route::apiResource('appointments', AppointmentController::class);
    
    // Mood entries
    Route::apiResource('mood-entries', MoodEntryController::class);
    Route::get('/mood-stats', [MoodEntryController::class, 'stats']);
});
Route::middleware('auth:sanctum')->group(function () {
    // Appointments
    Route::apiResource('appointments', AppointmentController::class);
    
    // Add explicit route for updating appointment date
    Route::patch('/appointments/{appointment}/update-date', [AppointmentController::class, 'updateDate'])
        ->name('appointments.update-date');
    
    // Mood entries
//     Route::apiResource('mood-entries', MoodEntryController::class);
//     Route::get('/mood-stats', [MoodEntryController::class, 'stats']);
});
Route::middleware('auth:sanctum')->get('/appointments/{appointment}/video-token', [AppointmentController::class, 'getVideoToken']);


Route::middleware('auth:sanctum')->group(function () {
    // Mood entries
    Route::get('/mood-entries', [MoodEntryController::class, 'index']);
    Route::post('/mood-entries', [MoodEntryController::class, 'store']);
    Route::get('/mood-stats', [MoodEntryController::class, 'stats']);
});

Route::put('/appointments/{appointment}', [AppointmentController::class, 'update']);

Route::delete('/appointments/{appointment}', [AppointmentController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'me']);

//Route::middleware('auth:sanctum')->get('/therapists',[PublicTherapistController::class, 'index']);

// Public routes
Route::get('/getTherapists', [PublicTherapistController::class, 'index']);
Route::apiResource('resources', ResourceController::class)->only(['index', 'show']);
Route::get('/resources/types', [ResourceController::class, 'types']);
Route::get('/resources/{resource}/download', [ResourceController::class, 'download']);

Route::middleware(['auth:sanctum'])->group(function () {
    // Therapist routes
    Route::prefix('therapist')->group(function () {
        Route::get('/dashboard', [TherapistController::class, 'dashboard']);
        Route::post('/online-status', [TherapistController::class, 'updateOnlineStatus']);
        Route::post('/appointments/{appointment}/end-call', [TherapistController::class, 'endVideoCall']);
        Route::post('/appointments/{appointment}/start-call', [TherapistController::class, 'startVideoCall']);
        Route::put('/appointments/{appointment}', [TherapistController::class, 'updateAppointment']);
    });});
// Route::prefix('therapist')->group(function () {
//         Route::get('/dashboard', [TherapistController::class, 'dashboard']);
//         Route::post('/online-status', [TherapistController::class, 'updateOnlineStatus']);
//         Route::post('/appointments/{appointment}/start-call', [TherapistController::class, 'startCall']);
//         Route::post('/appointments/{appointment}/end-call', [TherapistController::class, 'endCall']);
//         Route::put('/appointments/{appointment}', [TherapistController::class, 'updateAppointment']);
//     });
 // Therapist specific routes
 /*Route::prefix('therapist')->group(function () {
    Route::get('/dashboard', [TherapistController::class, 'dashboard']);
    Route::post('/appointments/{appointment}/start-call', [TherapistController::class, 'startVideoCall']);
    Route::put('/appointments/{appointment}', [TherapistController::class, 'updateAppointment']);*/

