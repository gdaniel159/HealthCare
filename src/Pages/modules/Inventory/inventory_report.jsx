import { Dropdown } from 'primereact/dropdown';
import SidebarComponent from "../../../Components/Sidebar";
import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import style_report from "./inventory_report.module.css";

export default function InventoryReport() {

    const [almacen, setAlmacen] = useState([]);
    const [selectedAlmacen, setSelectedAlmacen] = useState([]);
    const [items, setItems] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        fetchAlmacenes();
    }, []);

    const fetchAlmacenes = async () => {
        try {

            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/almacen', {
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
            setAlmacen(data);
        } catch (error) {
            console.error('Error fetching almacenes:', error);
        }
    };

    const handleAlmacenChange = (e) => {
        setSelectedAlmacen(e.value);
    };

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:5000/api/productos_por_almacen/${selectedAlmacen.id}`, {
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
            setItems(data);
        } catch (error) {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Selecciona un almacén' });
            console.error('Error fetching items:', error);
        }
    };

    return (
        <>
            <div className="container">
                <Toast ref={toast} />
                <SidebarComponent />

                <div className={`${style_report.container_table} flex flex-column m-5`}>
                    <div className={`${style_report.title_inventory} flex justify-content-between align-items-center`}>
                        <p>Consulta de inventarios</p>
                        <div className="flex">
                            <Button label="Ingreso" severity='success' icon="pi pi-plus" className='p-2 mb-3 mr-3' />
                            <Button label="Salida" severity='danger' icon="pi pi-minus" className='p-2 mb-3' />
                        </div>
                    </div>
                    <div className={`${style_report.info_inv} flex justify-content-around align-items-center`}>
                        <div>
                            <p className='mb-2'>Almacén</p>
                            <Dropdown value={selectedAlmacen} onChange={handleAlmacenChange} options={almacen} optionLabel="nombre" placeholder="Seleccionar Almacén" className="w-full md:w-14rem p-2" />
                        </div>
                    </div>
                    <div className='flex justify-content-around align-items-center'>
                        <Button label="Buscar" icon="pi pi-search" className='p-2 mb-3' onClick={handleSearch} />
                    </div>
                </div>

                <div className={style_report.table_data}>
                    <DataTable value={items} className="p-datatable-sm">
                        <Column field="id" header="ID" />
                        <Column field="nombre" header="Nombre" />
                        <Column field="stock" header="Stock" />
                    </DataTable>
                </div>

            </div>
        </>
    );
}