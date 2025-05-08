<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class UserQuiz extends Model
{
    use HasFactory;
    
    public function quiz() { return $this->belongsTo(Quiz::class); }
    public function user() { return $this->belongsTo(User::class); }
}
