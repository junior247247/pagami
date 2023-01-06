import { Firestore, getFirestore, collection, onSnapshot, orderBy, query,addDoc ,where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { app } from '../Firebase/conexion';
import { context } from '../hooks/AppContext'



interface Local {
  id: string;
  name: string;
}

export const Local = () => {

  const { onChange } = useContext(context);
  const [Local, setLocal] = useState<Local[]>([]);
  const [name, setname] = useState('');

  useEffect(() => {
    onChange('Local');

  }, [])



  const create=()=>{
    if(name=='')return alert('Debes ingresar el nombre')
    const db=getFirestore(app);
    const coll=collection(db,'Local');
    
    addDoc(coll,{
      name,
      timestamp:new Date().getTime()
    })
    setname('');

  }


  useEffect(() => {
    const db = getFirestore(app);
    const coll = collection(db, 'Local');
    const Q = query(coll, orderBy('timestamp', 'desc'));

    onSnapshot(Q, (resp) => {
      const data: Local[] = resp.docs.map(res => {
        return {
          id: res.id,
          name: res.get('name')
        }
      })
      setLocal(data);
    })

  }, [])


  return (
    <div>

      <div className="from-group row ml-3 mr-3">
        <input onChange={(e)=>setname(e.target.value)} type="text" className='form-control col-4' />
        <button className='btn btn-outline-light ml-3' onClick={create}>Guardar</button>
      </div>


      <div className="table-container col-8 mt-3  mr-3">
        <table className="table  table-dark table-hover ">
          <thead>
            <tr>
            
              <th scope="col th-sm">Nombre</th>
            </tr>
          </thead>
          <tbody >
            {
              (Local.map((resp, index) => (

                <tr key={index} className={'pointer'} >
                  <th scope="row">{resp.name}</th>
                </tr>
              )))
            }
          </tbody>
        </table>

      </div>

    </div>
  )
}
