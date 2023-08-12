<?php

namespace App\Http\Controllers;
use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    function getCourses() {
        $courses = Course::all();
        $user = Auth::user();
        foreach($courses as $course){
            $course->isEnrolled = $user->studentEnrollments->contains('course_id', $course->id);
            if ($course->isEnrolled){
                $course->attendances = $user->studentAttendances->count();
                $course->submissions = $user->submittedSubmissions->count();
                $course->questions_Answered = $user->questionsAnswered->count();
                $answered_questions = $user->questionsAnswered;
                $correctAnswerCount = 0;
                foreach ($answered_questions as $answered_question) {
                    if ($answered_question->answer == $answered_question->question->correct_answer) {
                        $correctAnswerCount++;
                            }
                        }
                    $course->correct_answers = $correctAnswerCount;
            }
            $course->teacher_name = $course->teacher->name;
            unset($course->teacher);
            unset($course->teacher_id);
            $materials = $course->materials;
            $course->materials = $materials;
            if($course->materials){
                foreach($materials as $material){
                    $quiz = Quiz::where('material_id', $material->id)->first();
                if(!$quiz){
                    $material->type = "assignment";
                } else {
                    $material->type = "quiz";
                    $material->questions = $quiz->questions;
                }
            }
        }
    }
    return response()->json(['status' => $courses]);
}
}
