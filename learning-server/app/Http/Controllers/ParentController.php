<?php

namespace App\Http\Controllers;

use App\Models\ParentModal;
use App\Models\Session;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\StudentAnswer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ParentController extends Controller
{

    public function getStudents()
    {
        $parent_id = Auth::id();

        $studentIds = ParentModal::where('parent_id', $parent_id)->pluck('student_id');

        $studentNames = User::whereIn('id', $studentIds)->pluck('name');

        return response()->json(['student_names' => $studentNames]);
    }
}
