import { Button } from "primereact/button";
import SidebarComponent from "../../../Components/Sidebar";
import style from "./insumos.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from 'react';

export default function Insumos() {

    const [insumos, setInsumos] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [proveedor, setProveedor] = useState([]);
    const [error, setError] = useState(null);

    const [newInsumo, setNewInsumo] = useState({
        nombre: '',
        proveedor_id: '',
        stock: '',
        almacen_id: 1
    });

    useEffect(() => {
        const fetchInsumos = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:5000/api/insumos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setInsumos(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchInsumos();
    }, []);

    const fetchProveedor = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/proveedor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const formattedProveedor = data.map(proveedor => ({
                label: proveedor.nombre,
                value: proveedor.id
            }));
            setProveedor(formattedProveedor);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const openNew = () => {
        setNewInsumo({
            nombre: '',
            proveedor_id: '',
            stock: '',
            almacen_id: 1
        });
        setDisplayDialog(true);
        fetchProveedor();
    };

    const hideDialog = () => {
        setDisplayDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInsumo({
            ...newInsumo,
            [name]: value
        });
    };

    const handleDropdownChange = (e) => {
        setNewInsumo({
            ...newInsumo,
            proveedor_id: e.value
        });
    };

    const saveProduct = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/insumos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newInsumo)
            });

            if (!response.ok) {
                throw new Error('Failed to save insumo');
            }

            const savedInsumos = await response.json();
            setInsumos([...insumos, savedInsumos]);
            hideDialog();
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container">
                <SidebarComponent />
                <div className={style.header}>
                <p className={style.title}>Listado de Insumos</p>
                <Button label='Agregar Producto' icon='pi pi-plus' className={style.addButton} onClick={openNew} />
            </div>
            <div className={style.tableContainer}>
                <DataTable value={insumos} className={style.dataTable}>
                    <Column field="id" header="Código" />
                    <Column field="nombre" header="Nombre" />
                    <Column field="proveedor_id" header="Proveedor" />
                    <Column field="stock" header="Cantidad" />
                </DataTable>
            </div>

            <Dialog visible={displayDialog} style={{ width: '450px' }} header="Agregar Producto" modal className="p-fluid" onHide={hideDialog}>
                <div className="field" style={{ padding: '10px' }}>
                    <label htmlFor="nombre">Nombre</label>
                    <InputText id="nombre" name="nombre" value={newInsumo.nombre} onChange={handleInputChange} style={{ padding: '6px' }} />
                </div>
                <div className="field" style={{ padding: '10px' }}>
                    <label htmlFor="proveedor_id">Proveedor</label>
                    <Dropdown id="proveedor_id" value={newInsumo.proveedor_id} options={proveedor} onChange={handleDropdownChange} placeholder="Selecciona una Categoría" style={{ padding: '10px' }} />
                </div>
                <div className="field" style={{ padding: '10px' }}>
                    <label htmlFor="stock_total">Cantidad</label>
                    <InputText id="stock_total" name="stock_total" value={newInsumo.stock} onChange={handleInputChange} style={{ padding: '10px' }} />
                </div>
                {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
                <div className="field" style={{ padding: '10px' }}>
                    <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />
                </div>
            </Dialog>
            </div>
        </>
    );
}