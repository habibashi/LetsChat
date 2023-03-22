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
        Schema::table('users_chat_rooms', function (Blueprint $table) {
            $table->unsignedBigInteger('chatRoom_id');
            $table->foreign('ChatRoom_id')->references('id')->on('chat_rooms');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users_chat_rooms', function (Blueprint $table) {
            $table->dropForeign(['chatRoom_id']);
            $table->dropColumn('chatRoom_id');
        });
    }
};
