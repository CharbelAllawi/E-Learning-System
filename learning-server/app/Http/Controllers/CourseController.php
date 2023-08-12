<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Course;
use App\Models\Material;
use App\Models\Assignment;
use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    function getCourses() {
        $courses = Course::all();
        $user = Auth::user();
        foreach($courses as $course){
            $course->isEnrolled = $user->studentEnrollments->contains('course_id', $course->id);
            $materials = $course->materials;
            if($materials){
                foreach($materials as $material){
                    $quiz = Quiz::where('material_id', $material->id)->first();
                if(!$quiz){
                    $material->type = "assignment";
                } else {
                    $material->type = "quiz";
                    $material->questions = $quiz->questions;
                }
            }
            $course->materials = $materials;
        }
    }
    return response()->json(['status' => $courses]);
}
}
