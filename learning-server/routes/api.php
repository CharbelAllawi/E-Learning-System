<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\SubmissionController;





Route::post('enroll', [EnrollmentController::class, 'enroll']);

Route::post('postassignment', [SubmissionController::class, 'postassignment']);

Route::controller(AuthController::class)->group(function () {

    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});
