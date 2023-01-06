
import React,{useContext} from 'react'
import { context } from '../hooks/AppContext'

export const Header = () => {
    const {state,signOut}=useContext(context);
  
    const showLateral=()=>{
      document.getElementById('lateral')!.style.width='300px';
      document.getElementById('transp')!.style.display='block';
    
    }


  return (
    <header className="d-flex mr-3  align-items-center justify-content-between">
      <div className="menu" onClick={showLateral}>
          <div className="menu-line "/>
          <div className="menu-line "/>
          <div className="menu-line "/>
      </div>
        <h1 className='text-white font-size-header'>{state.state}</h1>

        <button className='btn btn-color' onClick={signOut}>cerrar sesion</button>
    </header>
   
   )
    
  
}
