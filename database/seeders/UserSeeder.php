<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Jan Lawrence Madali',
            'email' => 'jan.lawrence.madali.bmiofficial@outlook.com',
            'password' => bcrypt('password'),
        ]);
    }
}
