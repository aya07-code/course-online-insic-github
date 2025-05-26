<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory;

    // Autoriser l'attribution de masse pour ces champs
    protected $fillable = [
        'titre',
        'description',
        'long_description', // Ajout ici
        'price',
        'duree',
        'categories_id',
        'language',
        'imageSrc', // Ajout ici
    ];

    public function category()
    {
        return $this->belongsTo(Categorie::class, 'categories_id');
    }
    public function chapitres() {
        return $this->hasMany(Chapitre::class)->with('lessons');
    }
    public function paiements() { return $this->hasMany(Paiement::class); }
    public function formationUsers() { return $this->hasMany(FormationUser::class); }
    public function users() { return $this->belongsToMany(User::class, 'formation_users'); }
    public function certifications() { return $this->hasMany(Certification::class); }
    public function feedbacks() {
        return $this->hasMany(\App\Models\Feedback::class, 'formation_id');
    }
}
