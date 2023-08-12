<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
    
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
