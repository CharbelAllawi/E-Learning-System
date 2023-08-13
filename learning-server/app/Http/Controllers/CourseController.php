<?php

namespace App\Http\Controllers;

use App\Models\Course;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    function getCourses() {
        $courses = Course::all();
        $user = Auth::user();
        foreach($courses as $course){
            $course->isEnrolled = $user->studentEnrollments->contains('course_id', $course->id);
            $course->teacher_name = $course->teacher->name;
            unset($course->teacher);
            unset($course->teacher_id);
            }
        
        return response()->json(['status' => $courses]);
    }
}
