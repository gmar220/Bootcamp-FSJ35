//rfc -> GENERA UN COMPONENTE CON EL NOMBRE DEL ARCHIVO Y EL EXPORT DEFAULT

//PROPS -> Es informacion que viaja de un componente PADRE a un componente HIJO
//NEXT -> Nosotros creamos propiedades al momento en que creamos un MODELO de sus propiedades
interface DespedidaProps {
    nombre: string;
    apellido:string;
}

export default function Despedida({nombre, apellido}: DespedidaProps){
    return (
        <div>
            <h3>gusbais maifren {nombre}, {apellido}</h3>
        </div>
    )
}