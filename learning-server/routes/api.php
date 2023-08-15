<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MailerController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\TeacherController;
use Symfony\Component\Mailer\MailerInterface;

Route::post('enroll', [EnrollmentController::class, 'enroll']);
Route::post('courseEnroll', [CourseController::class, 'courseEnroll']);

Route::post('postassignment', [SubmissionController::class, 'postassignment']);
Route::post('post_grade', [SubmissionController::class, 'postGrade']);
Route::get('/get_courses/{name?}', [CourseController::class, 'getCourses']);
Route::get('/get_children', [CourseController::class, 'getChildren']);
Route::post('/get_questions', [CourseController::class, 'getQuestions']);
Route::post('/enroll', [CourseController::class, 'enrollInCourse']);
Route::get('getstudents', [ParentController::class, 'getStudents']);
Route::post('getattendance', [AttendanceController::class, 'getattendance']);
Route::get('get_teacher_courses', [TeacherController::class, 'getTeacherCourses']);
Route::post("send-email", [MailerController::class, "composeEmail"]);
Route::post("addquiz", [TeacherController::class, "addQuiz"]);
Route::post("assignment", [TeacherController::class, "assignment"]);


Route::controller(AuthController::class)->group(function () {

    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});
