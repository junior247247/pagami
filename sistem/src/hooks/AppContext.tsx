import { type } from '@testing-library/user-event/dist/type';
import React, { createContext,useReducer ,useEffect,useState} from 'react'
import {signInWithEmailAndPassword,getAuth, signOut,onAuthStateChanged, User } from 'firebase/auth'
   
import { app } from '../Firebase/conexion';

export interface State{
    state:string,
    idLoca:string;
    close:boolean,
    stateLogin:'login'|'no-fondo'|'no-authenticate',
}

const initState:State={
    state:'Dashboard',
    idLoca:'V85kPfvW7vQSd9Ybq5CjiT88yg03',
    close:false,
    stateLogin:'no-authenticate'
}

interface Props{
    state:State;
    onChange:(state:string)=>void;
    login:(idLocal:string)=>void;
    signOut:()=>void;
    close:(close:boolean)=>void;
    CurrentUser:User;
}
export const context=createContext({}as Props);

type action={type:'update',state:string}|{type:'login',idLocal:string}|{type:'signOut'}|{type:'close',close:boolean};

const Reducer=(state:State,action:action):State=>{

    switch (action.type) {
        case 'update':
            return {
                ...state,
                state:action.state
            }
        case 'login':
            return{
                ...state,
                idLoca:action.idLocal,
                stateLogin:'login'
             
            }

            case 'signOut':
                return{
                ...state,
                idLoca:'',
            }
            
            case 'close':
                return{
                    ...state,
                    close:action.close
                }
        default:
            return state;
    }
}
//const auth=getAuth(app);


export const AppContext = ({children}:any) => {

    const [state, dispatch] = useReducer(Reducer,initState);
    const [CurrentUser, setCurrentUser] = useState<User>();

   
    
    const close=(close:boolean)=>{
        dispatch({type:'close',close});
    }
    const login=(idLogin:string)=>{
        dispatch({type:'login',idLocal:idLogin});
        //console.log(idLogin);
    }
    const onChange=(state:string)=>{
        dispatch({type:'update',state});
    }

    const signOut=()=>{
        const auth=getAuth(app);
        auth.signOut();
        dispatch({type:'signOut'})
    }
    
  return (
   <context.Provider 
   value={{
    state,
    onChange,
    login,
    signOut,
    close,
    CurrentUser:CurrentUser!
   }}
   >
        {children}
   </context.Provider>
  )
}
