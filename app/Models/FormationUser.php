<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class FormationUser extends Model
{
    use HasFactory;
    protected $table = 'formation_users';

    public function user() { return $this->belongsTo(User::class); }
    public function formation() { return $this->belongsTo(Formation::class); }
}
