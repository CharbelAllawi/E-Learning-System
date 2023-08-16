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
        if (Auth::user()->user_type_id == 1) {
            $courses = Course::all();
        } elseif(Auth::user()->user_type_id == 2) {
            $teacher_id = Auth::user()->id;
            $courses = Course::where('teacher_id', $teacher_id)->get();
        }
        $now = Carbon::now();
        foreach ($courses as $course) {
            $start_at = Carbon::parse($course->start_at);
            $end_at = Carbon::parse($course->end_at);
            $course_duration = $end_at->diffInDays($start_at);
            $days_elapsed = $now->diffInDays($start_at);
            if ($course_duration > 0) {
                $completion_rate = min(($days_elapsed / $course_duration) * 100, 100);
            } else {
                $completion_rate = 100;
            }
            $course->completion_rate = $completion_rate;
            $course->student_count = Enrollment::where('course_id', $course->id)->count();
            $enrolledStudentIds = Enrollment::where('course_id',  $course->id)->pluck('student_id');
            $enrolledStudents = User::whereIn('id', $enrolledStudentIds)->get(['id', 'name']);
            $course->enrolledStudents = $enrolledStudents;
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

    }


    public function addAssignment(Request $request)
    {
        $course_id = $request->course_id;
        $enrollments = Enrollment::all();
        foreach ($enrollments as $enrollment) {
            if ($enrollment['course_id'] == $course_id) {
                $student_id = $enrollment->student_id;
                $material = new Material(
                    [
                        'title' => 'Assignment',
                        'description' => $request->description,
                        'course_id' => $course_id,
                        'student_id' => $student_id,
                        'on_date' => Carbon::parse($request['on_date'])
                    ]
                );
                $material->save();
            }
        }
        return response()->json(['message' => 'success'], 201);
    }


    public function addQuiz(Request $request)
    {
        $course_id = $request->course_id;
        $quiz = new Quiz([
            'content' => $request->content,
            'on_date' => Carbon::parse($request['on_date'])
        ]);
        $quiz->save();
        $quiz_id = $quiz->id;
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
        return response()->json(['message' => 'success'], 201);
    }

    public function resultAssignment(Request $request)
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
