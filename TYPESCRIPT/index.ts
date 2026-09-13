// Diferencias entre TS y PHP
// El navegador no entiende los archivos typescript, el navegador solo entiende java, html y css

/* 
Comentario multi linea
*/

//Variables $nombreVariable
// Declaraciones variables con LET 

let variablecita = "corazón bello";

// Declarar una constante 
const constante = 3.14159;

//JAVASCRIPT con tipado duro
//Tipos de dato -> string, number, boolean
let booleano = true;

// Imprimir datos
console.log("kiúbole");

//Declaracion de funcion
function saludar(): string{
    return "kiúbole maje"
}
saludar();

function update(request : string){
    return "Actualizado correctamente";
}

let otraVariable : string = "soy otra variable";

// Manejo de arrays
//Array indexado
let arraycito = [1,2,3];
console.log(arraycito[1]);

//Array asociativo -> Vamos a tener que utilizaar un objeto
//Objeto literal
let arracitoAsociativo = {
    "nombre" : "Alejandro"
}

console.log(arracitoAsociativo['nombre']);

//Podemos crear tipos de datos

type persona = {
    nombre: string
}

let Guille : persona = {
    "nombre" : "Guillermo"
}

function registro(valor: persona){
    console.log(valor.nombre);

}

//Quiero que si o si el producto sea un objeto
type Producto = {
    precio:number
}

function mostrarPrecio(producto: Producto){
    console.log(producto.precio);
}

mostrarPrecio({precio:15});