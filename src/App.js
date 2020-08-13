import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'


function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarcitas] = useState(citasIniciales);

  //Use Effect para realizar operaciones cuando el state cambie
  //Siempre es un arrow function
  //El arreglo sirve para que solo se pase 1 vez por cada carga o cambio de la pagina
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
   }, [citas]);

  //Función que tome las citas actuales y agregue la nueva

  const crearCita = cita => {
    guardarcitas([...citas, cita]);
  }

  //Función que elimina una cita por su ida

  const eliminarCita = id => {
    const nuevaCitas = citas.filter( cita => cita.id !== id);
    guardarcitas(nuevaCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'



  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
