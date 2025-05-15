<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'matricule'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Générer automatiquement le matricule avant la création
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($student) {
            if (empty($student->matricule)) {
                $student->matricule = 'MAT' . str_pad(Student::max('id') + 1, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
