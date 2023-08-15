<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function addOrUpdateCourse(Request $request, $id = "add")
    {
        if ($id == "add") {
            $course = new Course;
        } else {
            $course = Course::where('id', $id)->first();
        }
        $user = User::where('email', $request->email)->first();
        $course->title = $request->title ? $request->title : $course->title;
        $course->description = $request->description ? $request->description : $course->description;
        $course->teacher_id = $user->id;
        $course->enrollment_limit = $request->enrollment_limit ? $request->enrollment_limit : $course->color;
        $course->number_of_quizzes = $request->number_of_quizzes ? $request->number_of_quizzes : $course->number_of_quizzes;
        $course->number_of_assignments = $request->number_of_assignments ? $request->number_of_assignments : $course->number_of_assignments;
        $course->start_at = date('Y-m-d H:i:s');
        $course->end_at = date('Y-m-d H:i:s');

        $course->number_of_sessions = $request->number_of_sessions ? $request->number_of_sessions : $course->number_of_sessions;
        $course->meeting_url = $request->meeting_url ? $request->meeting_url : $course->meeting_url;
        $course->save();

        return json_encode(["result" => "success"]);
    }
    public function deleteUserByEmail(Request $request)
    {
        $email = $request->input('email');
        $user = User::where('email', $email)->first();
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
