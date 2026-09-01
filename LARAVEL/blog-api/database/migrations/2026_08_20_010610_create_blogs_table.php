<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema representa nuestra BD (Base de Datos) 
        // Create es el método que ejecutamos en la BD
        // A créate le damos el nombre de la BD y los campos (es una función que utiliza blueprint (clase reservada) 

        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title',100);
            $table->text('content');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
