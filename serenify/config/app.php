<?php

return [
    'name' => env('APP_NAME', 'Laravel'),
    'env' => env('APP_ENV', 'production'),
    'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    */
    'timezone' => 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    */
    'locale' => env('APP_LOCALE', 'en'),
    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),
    'faker_locale' => env('APP_FAKER_LOCALE', 'en_US'),

    /*
    |--------------------------------------------------------------------------
    | Service Providers
    |--------------------------------------------------------------------------
    */
'providers' => [
    // Providers Laravel ESSENTIELS
    Illuminate\Encryption\EncryptionServiceProvider::class,
    Illuminate\Hashing\HashServiceProvider::class, // Doit être APRÈS EncryptionServiceProvider

    Illuminate\View\ViewServiceProvider::class, // <-- MANQUANT

    Illuminate\Foundation\Providers\FoundationServiceProvider::class,
    Illuminate\Routing\RoutingServiceProvider::class,
    Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class, // <-- Correction ici
    Illuminate\Bus\BusServiceProvider::class,
    
    Illuminate\Cookie\CookieServiceProvider::class, // Added cookie service provider

    Illuminate\Auth\AuthServiceProvider::class, // Add this line
    Illuminate\Broadcasting\BroadcastServiceProvider::class,
    Illuminate\Cache\CacheServiceProvider::class,
    Illuminate\Filesystem\FilesystemServiceProvider::class,
    Illuminate\Pipeline\PipelineServiceProvider::class,
    Illuminate\Queue\QueueServiceProvider::class,
    Illuminate\Session\SessionServiceProvider::class,
    Illuminate\Translation\TranslationServiceProvider::class,
    Illuminate\Validation\ValidationServiceProvider::class,
    Illuminate\Notifications\NotificationServiceProvider::class,
    Illuminate\Database\DatabaseServiceProvider::class,
    Illuminate\Database\MigrationServiceProvider::class,
        


    // Autres providers de base
    Illuminate\Database\DatabaseServiceProvider::class,
    Illuminate\Cache\CacheServiceProvider::class,
    Illuminate\Filesystem\FilesystemServiceProvider::class,
    Illuminate\Session\SessionServiceProvider::class,
    Illuminate\Validation\ValidationServiceProvider::class,
    // Vos Providers
    App\Providers\AppServiceProvider::class,
    App\Providers\RouteServiceProvider::class // Pas de virgule ici
],
'aliases' => [
    // AUTRES ALIAS...
    'Hash' => Illuminate\Support\Facades\Hash::class, // Doit être présent
    'Route' => Illuminate\Support\Facades\Route::class, // Alias pour la façade Route
    'View' => Illuminate\Support\Facades\View::class, // <-- MANQUANT
    'Auth' => Illuminate\Support\Facades\Auth::class, // <-- MANQUANT
    'Session' => Illuminate\Support\Facades\Session::class // <-- MANQUANT 
    
],
    /*
    |--------------------------------------------------------------------------
    | Encryption Configuration
    |--------------------------------------------------------------------------
    */
    'cipher' => 'AES-256-CBC',
    'key' => env('APP_KEY'),

'previous_keys' => array_filter(explode(',', env('APP_PREVIOUS_KEYS', ''))),

    /*
    |--------------------------------------------------------------------------
    | Maintenance Mode
    |--------------------------------------------------------------------------
    */
    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],
];