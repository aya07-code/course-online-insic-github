<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{   
    use HasFactory;
    protected $fillable = ['title', 'content', 'file_url', 'type', 'chapitre_id']; // Vérifiez que les champs sont autorisés
    public function chapitre() { return $this->belongsTo(Chapitre::class); }
}
