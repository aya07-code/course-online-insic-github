<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    
    public function formations() { return $this->hasMany(Formation::class, 'categories_id'); }
}
