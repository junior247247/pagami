import { getAuth } from 'firebase/auth';
import React, { useContext,useEffect } from 'react'
import { app } from '../Firebase/conexion';
import { context } from '../hooks/AppContext'
import { Login } from './Login';
import { MainComponent } from './MainComponent';
import {signInWithEmailAndPassword, signOut,onAuthStateChanged } from 'firebase/auth'



const auth=getAuth(app);
export const Stack = () => {


    const {state,CurrentUser} = useContext(context);
    
    //console.log(state.idLoca);

    useEffect(() => {
 
      console.log(CurrentUser)
    

     
    
     
    }, [])
    

    return(
      (state.stateLogin==='no-authenticate') ?    <Login/>: <MainComponent/>
   
    )
    


}
