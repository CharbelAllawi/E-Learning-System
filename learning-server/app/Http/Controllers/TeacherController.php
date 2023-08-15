<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Material;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller
{
    public function getTeacherCourses()
    {
        $user = Auth::user();
        $user_type_id = $user->user_type_id;
        if ($user_type_id == 2) {
            $teacher_id = $user->id;
            $courses = Course::where('teacher_id', $teacher_id)->get();
            $materials = [];
            foreach ($courses as $course) {
                $course->student_count = Enrollment::where('course_id', $course->id)->count();

                $materials = $course->materials;
                foreach ($materials as $material) {
                    $assignment_id = $material->assignment_id;
                    $assignment = Assignment::find($assignment_id);
                    $material->assignment = $assignment;
                }
            }
            return response()->json([
                'courses' => $courses,
            ]);
        } else {
            return response()->json([
                'error' => 'Not authorized',
            ], 401);
        }
    }
}
