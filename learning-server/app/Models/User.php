<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function userType()
    {
        return $this->belongsTo(UserType::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    public function parentOf()
    {
        return $this->hasMany(ParentModal::class, 'parent_id');
    }

    public function childOf()
    {
        return $this->hasOne(ParentModal::class, 'student_id');
    }

    public function sentNotifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'posted_by');
    }

    public function grades()
    {
        return $this->hasMany(Grade::class, 'student_id');
    }

    public function studentEnrollments()
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }
    public function studentAttendances()
    {
        return $this->hasMany(Attendance::class, 'student_id');
    }

    public function submittedSubmissions()
    {
        return $this->hasMany(Submission::class, 'student_id');
    }
    public function quizzesTaken()
    {
        return $this->hasMany(Quiz::class, 'student_id');
    }
    public function questionsAnswered()
    {
        return $this->hasMany(StudentsAnswer::class, 'student_id');
    }
}
