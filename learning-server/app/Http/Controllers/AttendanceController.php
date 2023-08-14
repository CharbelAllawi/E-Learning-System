<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Enrollment;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    public function getAttendance(Request $request)
    {
        if ($request->student_id) {
            $student_id = $request->input('student_id');
        } elseif(Auth::user()) {
            $student_id = Auth::user()->id;
        }
        $enrolled_course_ids = Enrollment::where('student_id', $student_id)->pluck('course_id')->toArray();
        $attendance_data = [];
        foreach ($enrolled_course_ids as $course_id) {
            $session_ids = Session::where('course_id', $course_id)->pluck('id')->toArray();
            foreach ($session_ids as $session_id) {
                $attendance = Attendance::where('session_id', $session_id)
                    ->where('student_id', $student_id)
                    ->first();
                $attendance_data[] = [
                    'course_id' => $course_id,
                    'session_id' => $session_id,
                    'is_present' => $attendance ? $attendance->is_present : false,
                ];
            }
        }
        return response()->json(['attendance' => $attendance_data]);
    }
}