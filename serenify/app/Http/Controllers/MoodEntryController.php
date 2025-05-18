<?php



namespace App\Http\Controllers;

use App\Models\MoodEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MoodEntryController extends Controller
{
    public function index()
    {
        $entries = MoodEntry::where('user_id', Auth::id())
            ->orderBy('entry_date', 'desc')
            ->get()
            ->map(function ($entry) {
                return [
                    'date' => $entry->entry_date->format('d M'),
                    'mood' => $entry->mood_level,
                    'notes' => $entry->notes,
                    'activities' => $entry->activities ?? [],
                ];
            });

        return response()->json($entries);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mood' => 'required|integer|between:1,5',
            'notes' => 'nullable|string|max:500',
            'activities' => 'nullable|array',
            'activities.*' => 'string|max:50',
        ]);

        $entry = MoodEntry::create([
            'user_id' => Auth::id(),
            'mood_level' => $validated['mood'],
            'notes' => $validated['notes'] ?? null,
            'activities' => $validated['activities'] ?? [],
            'entry_date' => now(),
        ]);

        return response()->json([
            'message' => 'Humeur enregistrée avec succès',
            'entry' => [
                'date' => $entry->entry_date->format('d M'),
                'mood' => $entry->mood_level,
                'notes' => $entry->notes,
                'activities' => $entry->activities ?? [],
            ]
        ], 201);
    }

    public function stats()
    {
        // Moyenne d'humeur et nombre total d'entrées
        $stats = MoodEntry::where('user_id', Auth::id())
            ->selectRaw('ROUND(AVG(mood_level), 1) as avg_mood, COUNT(*) as total_entries')
            ->first();

        // Données pour les 7 derniers jours
        $weeklyData = MoodEntry::where('user_id', Auth::id())
            ->where('entry_date', '>=', now()->subDays(7))
            ->orderBy('entry_date')
            ->get()
            ->map(function ($entry) {
                return [
                    'date' => $entry->entry_date->format('d M'),
                    'mood' => $entry->mood_level,
                ];
            });

        return response()->json([
            'avg_mood' => $stats->avg_mood,
            'total_entries' => $stats->total_entries,
            'weekly_data' => $weeklyData
        ]);
    }
}
/*class MoodEntryController extends Controller
{
    public function index()
    {
        return response()->json(
            MoodEntry::where('user_id', Auth::id())
                ->orderBy('entry_date', 'desc')
                ->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mood_level' => 'required|integer|between:1,5',
            'notes' => 'nullable|string|max:500',
            'activities' => 'array',
            'activities.*' => 'string|max:50',
            'entry_date' => 'date|before_or_equal:now'
        ]);

        $entry = MoodEntry::create([
            'user_id' => Auth::id(),
            ...$validated
        ]);

        return response()->json($entry, 201);
    }

    public function show(MoodEntry $moodEntry)
    {
        $this->authorize('view', $moodEntry);
        return response()->json($moodEntry);
    }

    public function update(Request $request, MoodEntry $moodEntry)
    {
        $this->authorize('update', $moodEntry);

        $validated = $request->validate([
            'mood_level' => 'integer|between:1,5',
            'notes' => 'nullable|string|max:500',
            'activities' => 'array',
            'activities.*' => 'string|max:50'
        ]);

        $moodEntry->update($validated);

        return response()->json($moodEntry);
    }

    public function destroy(MoodEntry $moodEntry)
    {
        $this->authorize('delete', $moodEntry);
        $moodEntry->delete();

        return response()->json(null, 204);
    }

    public function stats()
    {
        $stats = MoodEntry::where('user_id', Auth::id())
            ->selectRaw('ROUND(AVG(mood_level), 1) as avg_mood, COUNT(*) as total_entries')
            ->first();

        $weekly = MoodEntry::where('user_id', Auth::id())
            ->where('entry_date', '>=', now()->subDays(7))
            ->orderBy('entry_date')
            ->get(['entry_date', 'mood_level']);

        return response()->json([
            ...$stats->toArray(),
            'weekly_data' => $weekly
        ]);
    }
}*/