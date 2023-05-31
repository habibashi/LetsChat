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
        Schema::table('people_chat_rooms', function (Blueprint $table) {
            $table->unsignedBigInteger('user2_id');
            $table->foreign('user2_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('people_chat_rooms', function (Blueprint $table) {
            $table->unsignedBigInteger(['user2_id']);
            $table->dropColumn('user2_id');
        });
    }
};
