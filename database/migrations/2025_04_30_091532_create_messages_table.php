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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(); // nullable
            $table->string('email')->nullable(); // nullable
            $table->string('phone', 100)->nullable(); // nullable
            $table->text('content');
            $table->dateTime('date');
            $table->enum('status', ['read', 'unread'])->default('unread');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // nullable
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
