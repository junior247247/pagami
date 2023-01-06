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

  const [ButtonSelect, setButtonSelect] = useState<Butons>({ Productos: false, ingreso: false, salida: false, enReparacion: false, Historial: false, Tecnicos: false, Horario: false, Local: false });



  const closeMenu = () => {
    document.getElementById('lateral')!.style.width = '0';
    document.getElementById('transp')!.style.display = 'none';

  }


  return (

    <AppState>
     
    
    <Stack/>

    
    </AppState>
  );
}

export default App;
