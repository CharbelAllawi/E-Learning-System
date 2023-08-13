<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ParentController;

Route::post('enroll', [EnrollmentController::class, 'enroll']);

Route::post('postassignment', [SubmissionController::class, 'postassignment']);
Route::get('/get_courses', [CourseController::class, 'getCourses']);
Route::get('getstudents', [ParentController::class, 'getStudents']);
Route::get('getattendance', [ParentController::class, 'getattendance']);

Route::controller(AuthController::class)->group(function () {

    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});
