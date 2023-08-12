<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        

        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('user_type');
            $table->string('extra')->nullable();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedBigInteger('user_type_id');
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('user_type_id')->references('id')->on('user_types')->onDelete('cascade');

        });

        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id'); 
            $table->unsignedBigInteger('student_id');
            $table->timestamps();
            $table->foreign('parent_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {   
        Schema::dropIfExists('user_types');
        Schema::dropIfExists('users');
        Schema::dropIfExists('parents');
    }
};