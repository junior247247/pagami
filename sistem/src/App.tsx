import React, { useContext, useState } from 'react';

import './style/Style.css';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './component/Dashboard';
import { Productos } from './component/Productos';
import { EntradaArticulo } from './component/EntradaArticulo';
import { Salida } from './component/Salida';
import { AppContext, context } from './hooks/AppContext';
import { Header } from './component/Header';
import { Ventas } from './component/Ventas';
import { En_Reparacion } from './component/En_Reparacion';
import { Historial } from './component/Historial';
import { Tecnicos } from './component/Tecnicos';
import { Horario } from './component/Horario';
import { Local } from './component/Local';
import { Caja } from './component/Caja';
import { Gastos } from './component/Gastos';
import { Stack } from './component/Stack';
import { MainComponent } from './component/MainComponent';
import { Login } from './component/Login';


interface Butons {
  Productos: boolean;
  ingreso: boolean;
  salida: boolean;
  enReparacion: boolean;
  Historial: boolean;
  Tecnicos: boolean;
  Horario: boolean;
  Local: boolean;
}


const AppState = ({ children }: any) => {
  return (
    <AppContext>
      {children}
    </AppContext>
  )
}

const App = () => {

 
   

  const closeMenu = () => {
    document.getElementById('lateral')!.style.width = '0';
    document.getElementById('transp')!.style.display = 'none';

  }


  return (

    <AppState>
     
    
     <BrowserRouter>

<div className='container-fluid h-100 '>
  <div className="row">
    <div className="col-lg-2 barra-lateral p-0 justify-content-center bg-main d-lg-block " id='lateral'>
      <div className="d-flex justify-content-between  ">
        <div className="logo ">
          <img src={require('./img/logo.png')} alt="" />
        </div>
        <div className="menu mt-2" onClick={closeMenu} >
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
        </div>
      </div>

      <nav className="menu  d-flex  d-sm-block p-0  flex-wrap">
        <Link onClick={closeMenu} className='enlace col-sm-12  disable ' to={'/Local'}><span>Local</span></Link>
        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/Horario'}><span>Horario</span></Link>
        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/entrada'}><span>Ingreso</span></Link>
        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/EnReparacion'}><span>En reparacion</span></Link>
        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/salida'}><span>Listo para entregar</span></Link>
        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/Historial'}><span>Historial</span></Link>
        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/Venta'}><span>Venta</span></Link>

        <Link onClick={closeMenu} className={'enlace  col-sm-12 disable'} to={'/Productos'}><span>Productos</span></Link>

        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/Tecnicos'}><span>Tecnicos</span></Link>
        <Link onClick={closeMenu} className='enlace col-sm-12   disable' to={'/Gastos'}><span>Gastos</span></Link>


        <Link onClick={closeMenu} className='enlace col-sm-12 disable' to={'/Caja'}><span>Caja</span></Link>


      </nav>





    </div>
    <div className="col-10  p-0">




      <div className='pl-3 pt-3 sticky  bg-main '>

        <Header />
      </div>
      <Routes>
          
          
          
            <Route index element={<Productos />} />
            <Route path='/entrada' element={<EntradaArticulo />} />
            <Route path='/Productos' element={<Productos />} />
            <Route path='/salida' element={<Salida />} />
            <Route path='/Venta' element={<Ventas />} />
            <Route path='/EnReparacion' element={<En_Reparacion />} />
            <Route path='/Historial' element={<Historial />} />
            <Route path='/Tecnicos' element={<Tecnicos />} />
            <Route path='/Horario' element={<Horario />} />
            <Route path='/Local' element={<Local />} />
            <Route path='/Caja' element={<Caja />} />
            <Route path='/Gastos' element={<Gastos />} />
            <Route path='*' element={<Productos />} />
           
          
     

      </Routes>

    </div>
  </div>






</div>
</BrowserRouter>

    
    </AppState>
  );
}

export default App;
