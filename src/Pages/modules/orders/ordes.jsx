import React, { useEffect } from 'react';
import styles from './Pedidos.module.css';
import SidebarComponent from "../../../Components/Sidebar";

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
        window.onclick = function (event) {
            const modal = document.getElementById('myModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }, []);

    return (
        <>
            <div className={`${styles.container}`}>
                <SidebarComponent />
                <div>
                    <h1 className={`${styles.texto_pedidos} d-flex justify-content-center`}>Pedidos</h1>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className={`${styles.contenedor_formulario_pedidos}`}>
                        <div className={`${styles.contenedor_imputs_pedido}`}>
                            <div className='d-flex justify-content-center '>
                                <div className='mb-5 row'>
                                    <div className={`col-sm-12 ${styles.pedido001}`}>
                                        <input type='text' className='form-control' id='input1' placeholder='ID del Pedido' />
                                    </div>
                                </div>
                                <div className='mb-5 row'>
                                    <div className={`col-sm-12 ${styles.pedido002}`}>
                                        <input type='text' className='form-control' id='input2' placeholder='Nombre del Producto' />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <div className='mb-4 row'>
                                    <div className={`col-sm-12 ${styles.pedido001}`}>
                                        <input type='text' className='form-control' id='input3' placeholder='ID Categoria' />
                                    </div>
                                </div>
                                <div className='mb-4 row'>
                                    <div className={`col-sm-12 ${styles.pedido002}`}>
                                        <input type='text' className='form-control' id='input4' placeholder='Stock Total' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <button className={`${styles.boton_sector_pedido}`} onClick={handleAgregarClick}>Agregar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="myModal" className={`${styles.modal}`}>
                <div className={`${styles.modal_content}`}>
                    <span className={`${styles.close}`} onClick={handleCloseModal}>&times;</span>
                    <div className='d-flex justify-content-between'>
                        <button className={`${styles.boton_sector_pedido_modal}`}>0001</button>
                        <button className={`${styles.boton_sector_pedido_modal}`}>0002</button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Actividad;