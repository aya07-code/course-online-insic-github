<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar', // Ajout du champ avatar
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function student()    { return $this->hasOne(Student::class); }
    public function teacher()    { return $this->hasOne(Teacher::class); }
    public function assistant()  { return $this->hasOne(Assistant::class); }
    public function admin()      { return $this->hasOne(Admin::class); }

    public function paiements()        { return $this->hasMany(Paiement::class); }
    public function formationUsers()   { return $this->hasMany(FormationUser::class); }
    public function formations()       { return $this->belongsToMany(Formation::class, 'formation_users'); }

    public function certifications()   { return $this->hasMany(Certification::class); }
    public function userQuizzes()      { return $this->hasMany(UserQuiz::class); }
    public function feedbacks()        { return $this->hasMany(Feedback::class); }
    public function notifications()    { return $this->hasMany(Notification::class); }
    public function messages()         { return $this->hasMany(Message::class); }
}
