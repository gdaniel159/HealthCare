import React, { useEffect } from 'react';
import '../../../Pedidos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Actividad = () => {

    const handleAgregarClick = () => {
        const modal = document.getElementById('myModal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            console.error("Modal not found");
        }
    };

    const handleCloseModal = () => {
        const modal = document.getElementById('myModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };

    useEffect(() => {
        window.onclick = function(event) {
            const modal = document.getElementById('myModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }, []);

    return (
        <>
            <div className=''>
                <div>
                    <h1 className="texto-pedidos d-flex justify-content-center">Pedidos</h1>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='contenedor-formulario-pedidos'>
                        <div className='contenedor-imputs-pedido'>
                            <div className='d-flex justify-content-center '>
                                <div className='mb-5 row'>
                                    <div className='col-sm-12 pedido001'>
                                        <input type='text' className='form-control' id='input1' placeholder='ID del Pedido' />
                                    </div>
                                </div>
                                <div className='mb-5 row'>
                                    <div className='col-sm-12 w-5 pedido002'>
                                        <input type='text' className='form-control' id='input2' placeholder='Nombre del Producto' />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <div className='mb-4 row'>
                                    <div className='col-sm-12 pedido001'>
                                        <input type='text' className='form-control' id='input3' placeholder='ID Categoria' />
                                    </div>
                                </div>
                                <div className='mb-4 row'>
                                    <div className='col-sm-12 w-1 pedido002'>
                                        <input type='text' className='form-control' id='input4' placeholder='Stock Total' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <button className='boton-sector-pedido' onClick={handleAgregarClick}>Agregar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <div className='d-flex justify-content-between'>
                    <button className='boton-sector-pedido-modal'>0001</button>
                    <button className='boton-sector-pedido-modal'>0002</button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Actividad;