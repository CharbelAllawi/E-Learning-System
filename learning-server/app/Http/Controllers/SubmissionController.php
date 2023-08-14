<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    public function postassignment(Request $request)
    {
        $destination_path = "public/submissions/";
        $material_id = $request->material_id;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $original_file_name = $file->getClientOriginalName();
            $timestamp = now()->format('Ymd_His');
            $file_name = $timestamp . '_' . $original_file_name;
            $path = $request->file('file')->storeAs($destination_path, $file_name);

            $assignment = new Assignment([
                'submission_path' => $file_name,
                'created_at' => now()
            ]);
            $assignment->save();
            $assignment_id = $assignment->id;
            $material = Material::where('id', $material_id)->first();

            if (!$material) {
                return response()->json(['message' => 'Material not found'], 404);
            }
            $material->assignment_id = $assignment_id;
            $material->save();

            return response()->json(['message' => 'Assignment ID updated successfully']);
        }
    }

    public function postGrade(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $quiz_id = $request->quiz_id;
        $grade = $request->grade;

        $material = Material::where('quiz_id', $quiz_id)->where('student_id', $user_id)->first();

        if (!$material) {
            
        }
        if($material->grade){
            return response()->json(['message' => 'test already taken']);
        }
        $material->grade = $grade;
        $material->save();

        return response()->json(['message' => 'grade updated successfully']);
        }
    
}
