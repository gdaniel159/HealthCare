import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './../../../Sales.css'; 
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
        <div className="sales-container">
            <div className="sales-blur-overlay"></div>
            <SidebarComponent />
            <h1 className='sales-h1-ventas'>Ventas</h1>
            <form className="sales-form" onSubmit={handleSubmit}>
                <div className="sales-field">
                    <label htmlFor="id">ID</label>
                    <InputText id="id" placeholder="Ingrese el ID" />
                </div>
                <div className="sales-field">
                    <label htmlFor="pedido_id">Pedido ID</label>
                    <InputText id="pedido_id" placeholder="Ingrese el Pedido ID" />
                </div>
                <div className="sales-field">
                    <label htmlFor="saldo_total">Saldo Total</label>
                    <InputText id="saldo_total" type="number" placeholder="Ingrese el Saldo Total" />
                </div>
                <Button label="Agregar Venta" type="submit" />
            </form>
            <Dialog header="Venta Modal" visible={visible} style={{ width: '50vw', textAlign: 'center', padding: '10px'}} onHide={hideDialog}>
                <div className="sales-modal-buttons">
                    <Button label="Sí" icon="pi pi-check" className="p-button-success" onClick={hideDialog} />
                    <Button label="No" icon="pi pi-times" className="p-button-danger" onClick={hideDialog} />
                </div>
            </Dialog>
        </div>
    );
}
