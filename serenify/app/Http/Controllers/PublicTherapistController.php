<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PublicTherapistController extends Controller

{   
//  public function __construct()
// {
//     $this->middleware('auth');  // Assurez-vous que Sanctum est utilisé
//     $this->middleware(function ($request, $next) {
//         if (!Auth::user()->isTherapist()) {
//             return response()->json(['message' => 'Unauthorized'], 403);
//         }
//         return $next($request);
//     });

//     }
    public function index()
    {
        // Fetch therapists from the database
        $therapists = User::where('role', 'therapist')->get([
            'id',
            'name',
            'specialty',
            'experience',
            'avatar',
            'bio'
        ]);

        // Return therapists as a JSON response
        return response()->json($therapists);
    }
}

