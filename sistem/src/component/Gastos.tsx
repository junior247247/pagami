import { Firestore,getFirestore,addDoc,onSnapshot,orderBy,collection,query } from 'firebase/firestore';
import React, { useEffect, useContext,useState } from 'react'
import { app } from '../Firebase/conexion';
import { context } from '../hooks/AppContext'
import { ParseToDate } from '../hooks/ParseDate';
import { useForm } from '../hooks/useForm';

interface Gasto{
    id:string;
    motivo:string;
    timestamp:Date;
    monto:string;
}
export const Gastos = () => {

    const { onChange } = useContext(context);

    const [Gasto, setGasto] = useState<Gasto[]>([]);
    const  {onChange:onChangeForm,monto,motivo,clear} =  useForm({monto:'',motivo:''});

    useEffect(() => {
        onChange('Gastos')

    }, [])

    useEffect(() => {
        const db=getFirestore(app);
        const coll=collection(db,'Gastos');
        const Q=query(coll,orderBy('timestamp','desc'));
        onSnapshot(Q,(resp)=>{
            const data:Gasto[]=resp.docs.map(res=>{
                return{
                    id:res.id,
                    motivo:res.get('motivo'),
                    timestamp:new Date(res.get('timestamp')),
                    monto:res.get('monto')
                }
            })
            setGasto(data);
        })
    }, [])
    


    const create=()=>{
        if(monto==='' && motivo==='')return alert('Completa todos los campos');
        const db=getFirestore(app);
        const coll=collection(db,'Gastos');
        addDoc(coll,{
            monto,
            motivo,
            timestamp:new Date().getTime(),
            cierre:'SIN CIERRE'
        })
        clear();
    }

    return (
        <div>
            <div className="container-fluid ">
                <div className="row align-items-center">
                    <p className='text-white ml-3'>Gastos</p>
                    <div className="col-4">
                        <div className="form-group">
                            <input type="number" onChange={(e)=>onChangeForm(e.target.value,'monto')} placeholder='Monto' className='form-control' />
                        </div>

                    </div>
                    <div className="col">
                        <div className="form-group">
                            <input type="text" onChange={(e)=>onChangeForm(e.target.value,'motivo')} placeholder='Motivo' className='form-control' />
                        </div>
                    </div>

                    <div className="col-auto mb-3">
                        <button onClick={create} className="btn btn-outline-light">Guardar</button>
                    </div>
                </div>
            </div>

            <div className="table-container col-8 mt-3  mr-3">
        <table className="table  table-dark table-hover ">
          <thead>
            <tr>
            
              <th scope="col th-sm">Monto</th>
              
              <th scope="col th-sm">Motivo</th>
              <th scope="col th-sm">Fecha</th>
            </tr>
          </thead>
          <tbody >
            {
              (Gasto.map((resp, index) => (

                <tr key={index} className={'pointer'} >
                  <th scope="row">{resp.monto}</th>
                  <th scope="row">{resp.motivo}</th>
                  <th scope="row">{ParseToDate(resp.timestamp)}</th>
                </tr>
              )))
            }
          </tbody>
        </table>

      </div>

        </div>
    )
}
