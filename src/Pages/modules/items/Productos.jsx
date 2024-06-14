import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SidebarComponent from "../../../Components/Sidebar";
import style from "../items/styles/product.module.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export default function Productos() {

    const [products, setProducts] = useState([]);

    const [newProduct, setNewProduct] = useState({
        nombre: '',
        categoria_id: '',
        stock_total: '',
        almacen_id: 1
    });

    const [categories, setCategories] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:5000/api/product', {
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
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/categoria', {
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
            const formattedCategories = data.map(category => ({
                label: category.nombre,
                value: category.id
            }));
            setCategories(formattedCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const [displayDialog, setDisplayDialog] = useState(false);

    const openNew = () => {
        setNewProduct({
            nombre: '',
            categoria_id: null,
            stock_total: '',
            almacen_id: 1
        });
        setDisplayDialog(true);
        fetchCategories();
    };

    const hideDialog = () => {
        setDisplayDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleDropdownChange = (e) => {
        setNewProduct({
            ...newProduct,
            categoria_id: e.value
        });
    };

    const saveProduct = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                throw new Error('Failed to save product');
            }

            const savedProduct = await response.json();
            setProducts([...products, savedProduct]);
            hideDialog();
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={style.container}>
            <SidebarComponent />
            <div className={style.header}>
                <p className={style.title}>Listado de Productos</p>
                <Button label='Agregar Producto' icon='pi pi-plus' className={style.addButton} onClick={openNew} />
            </div>
            <div className={style.tableContainer}>
                <DataTable value={products} className={style.dataTable}>
                    <Column field="id" header="Código" />
                    <Column field="nombre" header="Nombre" />
                    <Column field="categoria_id" header="Categoría" />
                    <Column field="stock_total" header="Cantidad" />
                </DataTable>
            </div>

            <Dialog visible={displayDialog} style={{ width: '450px' }} header="Agregar Producto" modal className="p-fluid" onHide={hideDialog}>
                <div className="field" style={{ padding: '10px' }}>
                    <label htmlFor="nombre">Nombre</label>
                    <InputText id="nombre" name="nombre" value={newProduct.nombre} onChange={handleInputChange} style={{ padding: '6px' }} />
                </div>
                <div className="field" style={{ padding: '10px' }}>
                    <label htmlFor="categoria_id">Categoría</label>
                    <Dropdown id="categoria_id" value={newProduct.categoria_id} options={categories} onChange={handleDropdownChange} placeholder="Selecciona una Categoría" style={{ padding: '10px' }} />
                </div>
                <div className="field" style={{ padding: '10px' }}>
                    <label htmlFor="stock_total">Cantidad</label>
                    <InputText id="stock_total" name="stock_total" value={newProduct.stock_total} onChange={handleInputChange} style={{ padding: '10px' }} />
                </div>
                {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
                <div className="field" style={{ padding: '10px' }}>
                    <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />
                </div>
            </Dialog>
        </div>
    );
}
