<?php

namespace App\Http\Controllers;

use App\Models\Submission;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    public function postassignment(Request $request)
    {
        $user = Auth::user();
        $destination_path = "public/submissions/";

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $original_file_name = $file->getClientOriginalName();
            $timestamp = now()->format('Ymd_His');
            $file_name = $timestamp . '_' . $original_file_name;
            $path = $request->file('file')->storeAs($destination_path, $file_name);

            $submission = new Submission([
                'assignment_id' => $request->assignment_id,
                'student_id' => $user->id,
                'file_path' => $file_name,
                'submitted_at' => now()
            ]);
            $submission->save();

            return response()->json(['message' => 'File submitted', 'file_path' => $file_name], 201);
        }

        return response()->json(['message' => 'File not found'], 400);
    }
}
