// Un componente -> HTML y JS (En este caso TypeScript) en el mismo archivo
"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Despedida from "./components/Despedida";

export default function Home(){
  // No declaramos mas variables cuando necesitamos un dato mutable
//let nombre: string = "Macizo";

//Para utilizar un dato mutable, vamos a declarar un ESTADO
const [name,changeName] = useState("Guille"); 
const [lastName, changeLastName] = useState("Mujica");
// let Jacinto;

//function changeName(parametro){ Jacinto = parametro }
/*
  function cambiarNombre() :string{
    nombre = "Heeectooorrr";
    return nombre
  }*/

  return (
    <div>
      <Navbar />
      <h1>kiubole {name} {lastName}</h1>

      <br/>
      <Despedida nombre={name} apellido="Moran"/>

      <button onClick={() => changeName("Humberto")}>"Magic"</button>
      <Footer />
    </div>
  )
} 