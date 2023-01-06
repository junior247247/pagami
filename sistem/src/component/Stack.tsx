import { getAuth } from 'firebase/auth';
import React, { useContext,useEffect } from 'react'
import { app } from '../Firebase/conexion';
import { context } from '../hooks/AppContext'
import { Login } from './Login';
import { MainComponent } from './MainComponent';

export const Stack = () => {


    const {state} = useContext(context);
    console.log(state.idLoca);

    useEffect(() => {
      const auth=getAuth(app);

      console.log(auth.currentUser?.uid);
    }, [])
    
  return (
    
        (!state.idLoca) ? <Login/> :<MainComponent/>


    
  )

}
