<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->text('answers')->default('');
            $table->text('correct_answer')->default('');
        });
    }


    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('answers');
            $table->dropColumn('correct_answer');
        });
    }
};
