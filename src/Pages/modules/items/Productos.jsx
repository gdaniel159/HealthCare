import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SidebarComponent from "../../../Components/Sidebar";
import style from "../items/styles/product.module.css";
import { Button } from 'primereact/button';

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

    return (

        <>

            <div className={`${style.container}`}>

                <div className='flex align-items-center justify-content-between'>
                    <SidebarComponent />
                    <div className="crud-option-button">
                        <Button label='Crear' severity='success'></Button>
                    </div>
                </div>

                <div className="title-module">
                    <p>Listado de productos</p>
                </div>

                <div className="table-products">
                    <div className="card border-none">
                        <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="code" header="Code"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                        </DataTable>
                    </div>
                </div>
                
            </div>

        </>

    );
}