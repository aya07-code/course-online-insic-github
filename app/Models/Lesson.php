<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{   
    use HasFactory;
    protected $fillable = ['title','description', 'content', 'file_url', 'type', 'chapitre_id'];
    public function chapitre() { return $this->belongsTo(Chapitre::class); }
}
