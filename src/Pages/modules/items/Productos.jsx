import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SidebarComponent from "../../../Components/Sidebar";
import style from "../items/styles/product.module.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function Productos() {
    const [products, setProducts] = useState([
        { "code": "001", "name": "Product 1", "category": "Category A", "quantity": 10 },
        { "code": "002", "name": "Product 2", "category": "Category B", "quantity": 20 },
        { "code": "003", "name": "Product 3", "category": "Category A", "quantity": 15 },
        { "code": "004", "name": "Product 4", "category": "Category C", "quantity": 8 },
        { "code": "005", "name": "Product 5", "category": "Category B", "quantity": 12 },
        { "code": "006", "name": "Product 6", "category": "Category A", "quantity": 18 },
        { "code": "007", "name": "Product 7", "category": "Category C", "quantity": 25 },
        { "code": "008", "name": "Product 8", "category": "Category B", "quantity": 30 },
        { "code": "009", "name": "Product 9", "category": "Category A", "quantity": 22 },
        { "code": "010", "name": "Product 10", "category": "Category C", "quantity": 16 }
    ]);

    const [displayModal, setDisplayModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ code: '', name: '', category: '', quantity: 0 });

    const openModal = () => {
        setDisplayModal(true);
    }

    const hideModal = () => {
        setDisplayModal(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    }

    return (
        <div className={style.container}>
            <SidebarComponent />
            <div className={style.content}>
                <div className={style.header}>
                    <h1>Listado de Productos</h1>
                    <Button label="Agregar Producto" icon="pi pi-plus" className={style.addButton} onClick={openModal} />
                </div>
                <DataTable value={products} className={style.dataTable}>
                    <Column field="code" header="Código"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="category" header="Categoría"></Column>
                    <Column field="quantity" header="Cantidad"></Column>
                </DataTable>


                 
                <Dialog header="Agregar Producto" visible={displayModal} style={{ width: '50vw', fontSize: '18px'  }} onHide={hideModal}>
                    <div className="p-fluid">
                        <div className="p-field" style={{paddingTop: '20px' , margin: '10px'}}>
                            <label htmlFor="code">Código</label>
                            <InputText id="code" name="code" value={newProduct.code} onChange={handleInputChange} />
                        </div>
                        <div className="p-field" style={{paddingTop: '20px', margin: '10px'}}>
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" name="name" value={newProduct.name} onChange={handleInputChange} />
                        </div>
                        <div className="p-field" style={{paddingTop: '20px', margin: '10px'}}>
                            <label htmlFor="category">Categoría</label>
                            <InputText id="category" name="category" value={newProduct.category} onChange={handleInputChange} />
                        </div>
                        <div className="p-field" style={{paddingTop: '20px', margin: '10px'}}>
                            <label htmlFor="quantity">Cantidad</label>
                            <InputText id="quantity" name="quantity" type="number" value={newProduct.quantity} onChange={handleInputChange} />
                        </div>
                        <div className="p-field" style={{paddingTop: '10px'}}>
                            <Button label="Cerrar" icon="pi pi-times" onClick={hideModal} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
