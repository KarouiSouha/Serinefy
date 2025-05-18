<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users',
                // This is the highlighted rule:
                Rule::when($request->role === 'therapist', 'ends_with:@therapist.com')
                // ----------------------------------------
                // It means: if role is therapist, email must end with @therapist.com
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'sometimes|in:patient,therapist,admin',
            'specialty' => Rule::requiredIf($request->role === 'therapist'),
        ], [
            'email.ends_with' => 'Therapist must use an email ending with @therapist.com'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'patient',
            'specialty' => $request->specialty,
            'experience' => $request->experience,
            'bio' => $request->bio,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

  /*  public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
*/
public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);


    
    // Additional check for therapist login - NEW CODE
    if (str_ends_with($request->email, '@therapist.com')) {
        $user = User::where('email', $request->email)->first();
        if (!$user || !$user->isTherapist()) {
            return response()->json([
                'message' => 'Invalid therapist credentials'
            ], 401);
        }
    }
    // END OF NEW CODE

    // Your existing authentication logic
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'message' => 'Invalid login details'
        ], 401);
    }

    $user = User::where('email', $request->email)->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer',
    ]);
}
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}