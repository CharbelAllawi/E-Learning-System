<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Material;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    function getCourses($name = "all")
    {
        $courses = Course::all();
        if ($name == "all") {
            $user = Auth::user();
        } else {
            $student = User::where("name", $name)->first();
            $user = $student;
        }
        $filtered_courses = [];
        foreach ($courses as $course) {
            $course->isEnrolled = $user->studentEnrollments->contains('course_id', $course->id);
            if ($course->isEnrolled) {
                $course->student_materials = $course->materials->where('student_id', $user->id)
                    ->each(function ($material) {
                        // unset($material->student_id);
                        unset($material->created_at);
                        unset($material->updated_at);
                    });
            }
            $course->teacher_name = $course->teacher->name;
            unset($course->teacher);
            unset($course->teacher_id);
            unset($course->materials);
            if ($name !== "all" && !$course->isEnrolled) {
                continue;
            }
            $filtered_courses[] = $course;
        }
        return response()->json([
            'status' => 'success',
            'courses' => $filtered_courses
        ]);
    }

    function getChildren()
    {
        $user = Auth::user();
        $children = $user->parentOf;
        $names = [];
        foreach ($children as $child) {
            $name = User::where("id", $child->student_id)->pluck('name');
            array_push($names, $name[0]);
        }
        return response()->json([
            'status' => 'success',
            'children' => $names
        ]);
    }

    function getQuestions(Request $request)
    {
        $user = Auth::user();
        try {
            if (Material::where('id', $request->id)->where('student_id', $user->id)) {
                $questions = Quiz::where('id', $request->quiz_id)->first();
                return response()->json([
                    'status' => 'success',
                    'questions' => $questions->content
                ]);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'failed']);
        }
    }
    public function courseEnroll(Request $request)
    {
        $studentId = Auth::user()->id;
        $course_id = $request->course_id;
        $enrollment = new Enrollment([
            'student_id' => $studentId,
            'course_id' => $course_id,
            'enrolled_at' => now(),
            'is_completed' => false,
        ]);

        $enrollment->save();

        return response()->json(['message' => 'Enrollment successful'], 201);
    }

    function enrollInCourse(Request $request) {
        $user = Auth::user();
        $course_id = $request->course_id;
        if(Enrollment::where('student_id', $user->id)->where('course_id', $course_id)->first()){
            return response()->json([
                'message' => 'already enrolled'
            ]);
        }
        $enrollment = new Enrollment();
        $enrollment->student_id = $user->id;
        $enrollment->course_id = $course_id;
        $enrollment->save();
        return response()->json([
            'message' => 'enrolled successfully'
        ]);
    }
}
