import { type } from '@testing-library/user-event/dist/type';
import React, { createContext,useReducer ,useEffect} from 'react'
import {signInWithEmailAndPassword,getAuth, signOut,onAuthStateChanged } from 'firebase/auth'
import { app } from '../Firebase/conexion';

export interface State{
    state:string,
    idLoca:string;
    close:boolean
}

const initState:State={
    state:'Dashboard',
    idLoca:'',
    close:false
}

interface Props{
    state:State;
    onChange:(state:string)=>void;
    login:(idLocal:string)=>void;
    signOut:()=>void;
    close:(close:boolean)=>void;
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
                idLoca:action.idLocal
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


export const AppContext = ({children}:any) => {

    const [state, dispatch] = useReducer(Reducer,initState);

    useEffect(() => {

        const auth=getAuth(app);

        onAuthStateChanged(auth,(user)=>{
            if(user?.uid!=null){
                dispatch({type:'login',idLocal:auth.currentUser!.uid});
            }
            
        })

     


    }, [])
    
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
    close
   }}
   >
        {children}
   </context.Provider>
  )
}
