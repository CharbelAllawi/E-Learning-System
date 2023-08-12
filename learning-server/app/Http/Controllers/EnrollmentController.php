<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class EnrollmentController extends Controller
{
    public function enroll(Request $request)
    {
        $studentId = Auth::id();

        $courseId = $request->input('course_id');

        $course = Course::find($courseId);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        if ($course->enrollments()->count() >= $course->enrollment_limit) {
            return response()->json(['message' => 'Course enrollment limit is full'], 400);
        }

        $enrollment = new Enrollment([
            'student_id' => $studentId,
            'course_id' => $courseId,
        ]);

        $enrollment->save();

        return response()->json(['message' => 'Enrollment successful'], 200);
    }
}
