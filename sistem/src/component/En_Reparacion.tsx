import { collection, getFirestore, onSnapshot, query, orderBy, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Entrada } from '../entidades/Entrada';
import { app } from '../Firebase/conexion';
import { context } from '../hooks/AppContext'
import { ParseToDate } from '../hooks/ParseDate';
import { ReporteEntrada } from './ReporteEntrada';

export const En_Reparacion = () => {

    const { onChange } = useContext(context);
    const [Data, setData] = useState<Entrada[]>([]);
    const [IsVisible, setIsVisible] = useState({ isVisible: false, id: '' });
    const [IsVisibleReport, setIsVisiblReporte] = useState({ isVisible: false, id: '' });

    const [FilterData, setFilterData] = useState<Entrada[]>([]);




    const listo = (id: string) => {
        const db = getFirestore(app);
        const coll = collection(db, 'Entrada');
        const document = doc(coll, id);
        updateDoc(document, {
            estado: 'Listo para entregar'
        })
        setIsVisible({ isVisible: false, id: '' })

    }

    const retirar = (id: string) => {
        const db = getFirestore(app);
        const coll = collection(db, 'Entrada');
        const document = doc(coll, id);
        updateDoc(document, {
            estado: 'Retirado'
        })
        setIsVisible({ isVisible: false, id: '' })

    }


    useEffect(() => {
        onChange('En reparacion')
        const db = getFirestore(app);
        const coll = collection(db, 'Entrada');
        const itemsQuery = query(coll, orderBy('timestamp', 'desc'), where('estado', '==', 'En Reparacion'));
        onSnapshot(itemsQuery, (snap) => {
            const data: Entrada[] = snap.docs.map(resp => {
                return {
                    id: resp.id,
                    name: resp.get('name'),
                    phone: resp.get('telefono'),
                    correo: resp.get('correo'),
                    identiifcation: resp.get('identification'),
                    observacion: resp.get('observacion'),
                    costoReparacion: resp.get('costoReparacion'),
                    costoRepuesto: resp.get('csotoRepuesto'),
                    fecha: new Date(resp.get('timestamp')),
                    total: resp.get('total'),
                    equipo: resp.get('equipo'),
                    serial: resp.get('serial'),
                    estado: resp.get('estado')
                }
            })
            setData(data);
            setFilterData(data);
        })


    }, [])

    return (
        <div>

            <div className="d-flex ml-3 mt-3 mb-5 align-items-center">
                <div className="col-auto">
                    <h5 className='text-white'>Buscar</h5>
                </div>
                <div className="col-auto">
                    <input type="text" onChange={(e)=>  setFilterData(Data.filter(resp=>resp.name.includes(e.target.value)))} placeholder='Buscar por nombre' className='form-control' />
                </div>

            </div>

            <div className="table-container ml-3 mr-3">
                <table className="table  table-dark table-hover ">
                    <thead>
                        <tr>
                            <th scope="col th-sm">Nombre</th>
                            <th scope="col">Id</th>
                            <th scope="col">Equipo</th>
                            <th scope="col">Serial</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Reparacion</th>
                            <th scope="col">Repuesto</th>
                            <th scope="col">Total</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Retirar</th>

                        </tr>
                    </thead>
                    <tbody >
                        {
                            FilterData.map((resp, index) => (
                                <tr key={index} className={'pointer'} onDoubleClick={()=> setIsVisiblReporte({ isVisible: true, id: resp.id })}>
                                    <th scope="row">{resp.name}</th>
                                    <td>{resp.identiifcation}</td>
                                    <td>{resp.equipo}</td>
                                    <td>{resp.serial}</td>
                                    <td>{resp.phone}</td>
                                    <td>{ParseToDate(resp.fecha)}</td>
                                    <td>{resp.costoReparacion}</td>
                                    <td>{resp.costoRepuesto}</td>
                                    <td>{resp.total}</td>
                                    <td>{resp.correo}</td>
                            
                                    <td><a href="#" className='btn btn-color' onClick={() => setIsVisible({ isVisible: true, id: resp.id })}>Estado</a></td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>

            </div>



            {(IsVisible.isVisible) &&
                <div className="modal-container-delete" id='modal-container-delete' onClick={() => setIsVisible({ isVisible: false, id: '' })}>
                    <div className="modal-delete" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-between header-modal  align-items-center">
                            <p className='ml-2 mt-3 '>Actualizar Estado</p>
                            <button onClick={() => setIsVisible({ isVisible: false, id: '' })} className='btn bg-white f5'>&times;</button>
                        </div>
                        <hr />
                        <h5 className='display-5 text-center mt-1'>Seleccione una opcion</h5>

                        <div className="d-flex justify-content-between p-3 mt-3">
                            <button className='btn btn-color' onClick={() => retirar(IsVisible.id)} >Retirado</button>

                            <button className='btn btn-color' onClick={() => listo(IsVisible.id)} >Listo</button>
                        </div>
                    </div>

                </div>



            }








            {

                (IsVisibleReport.isVisible) &&

                <div className="modal-report-container" onClick={() => {

                    setIsVisiblReporte({ isVisible: false, id: '' })


                }}>
                    <div className="modal-report">
                        <div className="modal-report-header" onClick={(e) => e.stopPropagation()}>
                            <h6>Reporte</h6>
                            <a onClick={() => setIsVisiblReporte({ isVisible: false, id: '' })} className="btn f5">&times;</a>
                        </div>
                        <ReporteEntrada id={IsVisibleReport.id} />
                    </div>
                </div>

            }







        </div>

    )
}
