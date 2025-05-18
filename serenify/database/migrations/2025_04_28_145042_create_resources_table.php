<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['article', 'video', 'exercise', 'discussion']);
            $table->text('content')->nullable(); // Pour les articles/exercices
            $table->string('video_url')->nullable(); // Pour les vidéos
            $table->string('thumbnail')->nullable();
            $table->string('duration')->nullable(); // Pour les vidéos
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
