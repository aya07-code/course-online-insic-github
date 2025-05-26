<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Chapitre extends Model
{
    protected $fillable = ['title', 'description', 'formation_id'];
    use HasFactory;

    public function formation() {return $this->belongsTo(Formation::class);}
    public function lessons() {return $this->hasMany(Lesson::class);}
    public function quiz() {return $this->hasOne(Quiz::class);}
}
