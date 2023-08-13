<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use App\Models\Enrollment;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    function getCourses() {
        $user = Auth::user();
        $courses = Course::all();
        foreach($courses as $course){
            
            $course->isEnrolled = $user->studentEnrollments->contains('course_id', $course->id);
            if($course->isEnrolled){
                $course->student_materials = $course->materials->where('student_id', $user->id)
                ->each(function ($material) {
                    unset($material->student_id);
                    unset($material->created_at);
                    unset($material->updated_at);
                });
            }
            $course->teacher_name = $course->teacher->name;
            unset($course->teacher);
            unset($course->teacher_id);
            unset($course->materials);
            
        }
        return response()->json(['status' => 'success',
                                'courses' => $courses]);
    }

    function getChildren() {
        $user = Auth::user();
        $children = $user->parentOf;
        $names = [];
        foreach($children as $child){
            $name = User::where("id", $child->student_id)->pluck('name');
            array_push($names, $name[0]);
        }

        return response()->json(['status' => 'success',
                                'children' => $names]);
    }
}
