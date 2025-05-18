<?php

namespace App\Policies;

use App\Models\MoodEntry;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MoodEntryPolicy
{
    use HandlesAuthorization;

    public function view(User $user, MoodEntry $moodEntry)
    {
        return $user->id === $moodEntry->user_id;
    }

    public function update(User $user, MoodEntry $moodEntry)
    {
        return $user->id === $moodEntry->user_id;
    }

    public function delete(User $user, MoodEntry $moodEntry)
    {
        return $user->id === $moodEntry->user_id;
    }
}