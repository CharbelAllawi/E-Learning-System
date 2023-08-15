<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Material;
use App\Models\Quiz;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

class TeacherController extends Controller
{
    public function getTeacherCourses()
    {
        $user = Auth::user();
        $user_type_id = $user->user_type_id;
        if ($user_type_id == 2) {
            $teacher_id = $user->id;
            $courses = Course::where('teacher_id', $teacher_id)->get();
            foreach ($courses as $course) {
                $course->student_count = Enrollment::where('course_id', $course->id)->count();
                $enrolledStudentIds = Enrollment::where('course_id',  $course->id)->pluck('student_id');
                $enrolledStudents = User::whereIn('id', $enrolledStudentIds)->get(['id', 'name']);
                $course->enrolledStudents = $enrolledStudents; // Fix this line
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




    public function addQuiz(Request $request)
    {
        $mainCourseID = $request->course_id;
        $quiz = new Quiz([
            'content' => $request->content,
            'on_date' => Carbon::parse($request['on_date'])
        ]);

        $quiz->save();
        $quiz_id = $quiz->id;
        $courses = Course::all();
        foreach ($courses as $course) {
            $course_id = $course->id;
            if ($course_id == $mainCourseID) {
                $enrollments = Enrollment::all();
                foreach ($enrollments as $enrollment) {
                    if ($enrollment['course_id'] == $course_id) {
                        $student_id = $enrollment->student_id;
                        $material = new Material(
                            [
                                'title' => 'Quiz',
                                'description' => $request->description,
                                'course_id' => $course_id,
                                'student_id' => $student_id,
                                'quiz_id' => $quiz_id

                            ]
                        );
                        $material->save();
                    }
                }
            }
            return response()->json(['message' => 'success'], 201);
        }
    }

    public function assignment(Request $request)
    {
        $student_id = $request->student_id;
        $feedback = $request->feedback;
        $grade = $request->grade;
        $assignment_id = $request->assignment_id;
        $material = Material::where('assignment_id', $assignment_id)
            ->where('student_id', $student_id)
            ->first();
        $material->feedback = $feedback;
        $material->grade =  $grade;
        $material->save();
        return response()->json(['message' => 'success']);
    }
}
