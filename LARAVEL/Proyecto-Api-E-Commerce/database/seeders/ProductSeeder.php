<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder {
    public function run(): void {
        Product::create([
            'name' => 'Laptop Gamer Pro',
            'description' => '16GB RAM, 1TB SSD, RTX 4060',
            'price' => 1250.00,
            'stock' => 15
        ]);
        Product::create([
            'name' => 'Mouse Ergonómico Inalámbrico',
            'description' => 'Batería recargable y sensor óptico 4000 DPI',
            'price' => 45.99,
            'stock' => 50
        ]);
    }
}
