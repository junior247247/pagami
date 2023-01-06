import { async } from '@firebase/util';
import { Firestore, getFirestore, where, collection, getDocs, query, onSnapshot, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useContext, useState } from 'react'
import { app } from '../Firebase/conexion';
import { context } from '../hooks/AppContext'
import { ReporteCierre } from './ReporteCierre';

interface Money {
  monto: number
}


export const Caja = () => {

  const { onChange,state } = useContext(context);

  const {idLoca}=state;
  const [IsVisible, setIsVisible] = useState(false);

  const [IsVisibleReport, setIsVisibleReport] = useState(false);
  const [DineroEnCaja, setDineroEnCaja] = useState<number>(0);
  const [monto, setmonto] = useState<Money[]>([]);

  useEffect(() => {
    onChange('Caja')
  }, [])

  useEffect(() => {
    const db = getFirestore(app);
    const coll = collection(db, 'Entrada');
    const Q = query(coll, where('CIERRE', '==', 'SIN CIERRE'));
    onSnapshot(Q, (resp) => {
      const data: Money[] = resp.docs.map(res => {
        return {
          monto: Number(res.get('total'))
        }
      })
      setmonto(data);
    })

  }, [])


  useEffect(() => {
    const db=getFirestore(app);
    const coll=collection(db,'cajaDiaria');

    const document=doc(coll,idLoca);
    const getD=getDoc(document);
    getD.then(resp=>{
      if(resp.exists()){
        const dineri:number=Number(resp.get('money'));
        setDineroEnCaja(dineri);
      }
    })
    

  }, [])
  


  const cerrarTurno = async () => {
    const db = getFirestore(app);
    const coll = collection(db, 'Entrada');
    const Q = query(coll, where('CIERRE', '==', 'SIN CIERRE'));
    const document = await getDocs(Q);

  }

  return (
    <div>

      <div className="d-flex justify-content-between ml-2 mr-2 mt-3">
        <div className="col-4 border rounded">
          <h4 className='text-color'>Total ingresos:{monto.reduce((total, obj) => total + Number(obj.monto), 0)}</h4>

          <h4 className='text-color'>Dinero en caja:{DineroEnCaja}</h4>
          <h4 className='text-color'>Hora caja Abierta</h4>

        </div>
        <div className="col-4 border rounded">
          <h4 className='text-color'>Fondo en caja:0</h4>
          <button className='btn btn-outline-light w-100 mt-4' onClick={() => setIsVisible(true)}>Cerrar Turno</button>
        </div>
      </div>


      <div className="table-container ml-3 mr-3 mt-5">
        <table className="table table-dark table-hover ">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Identificacion</th>
              <th scope="col">Equipo</th>
              <th scope="col">Serial</th>

              <th scope="col">Telefono</th>
              <th scope="col">Fecha</th>
              <th scope="col">Reparacion</th>
              <th scope="col">Repuesto</th>
              <th scope="col">Total</th>
              <th scope="col">Correo</th>

            </tr>
          </thead>
          <tbody >

            <tr >
              <th scope="row">{'resp.name'}</th>
              <td>{'resp.identiifcation'}</td>
              <td>{'resp.equipo'}</td>
              <td>{'resp.serial'}</td>
              <td>{'resp.phone'}</td>
              <td>{''}</td>
              <td>{''}</td>
              <td>{''}</td>
              <td>{'resp.total'}</td>
              <td>{'resp.correo'}</td>
              <td><a className='btn btn-success'  >Imprimir</a></td>
            </tr>


          </tbody>
        </table>

      </div>


      {
        (IsVisible) &&

        <div className="modal-container-delete" id='modal-container-delete' onClick={() => setIsVisible(false)}>
          <div className="modal-delete " onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between header-modal  align-items-center">
              <p className='ml-2 mt-3 '>Cerrar Turno</p>
              <button onClick={() => setIsVisible(false)} className='btn bg-white f5'>&times;</button>
            </div>
            <hr />
            <h5 className='display-5 text-center mt-1'>Dinero en caja</h5>
            <div className="form-group mr-3 ml-3">
              <input type="text" className='form-control bg-main' placeholder='asdsd' />
            </div>
            <div className="d-flex justify-content-between ">
              <button className='btn btn-color w-75 m-auto'  >Cerrar Turno</button>


            </div>
          </div>

        </div>





      }


      {
        (IsVisibleReport) && 

        <div className="modal-report-container" id='modal-report-container' onClick={() => {

          setIsVisibleReport(false)
  
  
        }}>
          <div className="modal-report">
            <div className="modal-report-header" onClick={(e) => e.stopPropagation()}>
              <h6>Reporte</h6>
              <a onClick={() => {
                setIsVisibleReport(false)
  
              }} className="btn btn-danger">&times;</a>
            </div>
            <ReporteCierre />
          </div>
        </div>
      }


   






    </div>
  )
}
