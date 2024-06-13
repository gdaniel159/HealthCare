import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styles from "./Sales.module.css";
import SidebarComponent from "../../../Components/Sidebar";

export default function Sales() {
    const [visible, setVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };

    return (
        <>
            <div className={`${styles.container}`}>
                
                <SidebarComponent />

                <h1 className={`${styles.h1_ventas}`}>Ventas</h1>
                
                <div className={`${styles.container_form}`}>
                    <form className={`${styles.sales_form}`} onSubmit={handleSubmit}>
                        <div className={`${styles.field}`}>
                            <label htmlFor="id">ID</label>
                            <InputText id="id" placeholder="Ingrese el ID" />
                        </div>

                        <div className={`${styles.field}`}>
                            <label htmlFor="pedido_id">Pedido ID</label>
                            <InputText id="pedido_id" placeholder="Ingrese el Pedido ID" />
                        </div>

                        <div className={`${styles.field}`}>
                            <label htmlFor="saldo_total">Saldo Total</label>
                            <InputText id="saldo_total" type="number" placeholder="Ingrese el Saldo Total" />
                        </div>

                        <Button label="Agregar Venta" type="submit" />
                    </form>
                </div>

                <Dialog header="Venta Modal" visible={visible} style={{ width: '50vw', textAlign: 'center', padding: '10px' }} onHide={hideDialog}>
                    <div className={`${styles.modal_buttons}`}>
                        <Button label="Sí" icon="pi pi-check" className="p-button-success" onClick={hideDialog} />
                        <Button label="No" icon="pi pi-times" className="p-button-danger" onClick={hideDialog} />
                    </div>
                </Dialog>
            </div>
        </>
    );
}
