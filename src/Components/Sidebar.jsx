import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { useNavigate } from 'react-router-dom';
import { Image } from 'primereact/image';
import logo from "../assets/logo_image.png";

export default function SidebarComponent() {

    const [visible, setVisible] = useState(false);
    const btnRef1 = useRef(null);

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        setVisible(false);
        navigate(path);
    }

    function isTokenExpired() {
        const expirationTime = localStorage.getItem('token_expiration');
        if (!expirationTime) {
            return true;
        }
        return Date.now() > expirationTime;
    }
    
    function getToken() {
        if (isTokenExpired()) {
            localStorage.removeItem('token');
            localStorage.removeItem('token_expiration');
            return null;
        }
        return localStorage.getItem('token');
    }

    useEffect(() => {
        const token = getToken();
        if (!token) {
            window.location.href = '/';
        } else {
            console.log(true)
        }
    }, []);

    return (

        <>

            <div className="card flex justify-content-center border-none">
                <Sidebar
                    visible={visible}
                    onHide={() => setVisible(false)}
                    content={({ closeIconRef, hide }) => (
                        <div className="min-h-screen flex relative lg:static surface-ground">
                            <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '100%' }}>
                                <div className="flex flex-column h-full">
                                    <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                        <span className="inline-flex align-items-center gap-2">
                                            {/* <Image src={logo} alt="Image" width='60' /> */}
                                            <span className="font-semibold text-2xl text-primary">HealthCare</span>
                                        </span>
                                        <span>
                                            <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                                        </span>
                                    </div>
                                    <div className="overflow-y-auto">
                                        <ul className="list-none p-3 m-0">
                                            <li>
                                                <ul className="list-none p-0 m-0 overflow-hidden">
                                                    <li>
                                                        <a onClick={() => handleNavigation('/home')} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                            <i className="pi pi-home mr-2"></i>
                                                            <span className="font-medium">Dashboard</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => handleNavigation('/items')} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                            <i className="pi pi-bookmark mr-2"></i>
                                                            <span className="font-medium">Productos</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                            <a ref={btnRef1} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                                <i className="pi pi-chart-line mr-2"></i>
                                                                <span className="font-medium">Inventario</span>
                                                                <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                                                <Ripple />
                                                            </a>
                                                        </StyleClass>
                                                        <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                            <li>
                                                                <a onClick={() => handleNavigation('/items/inventory_report')} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                                    <i className="pi pi-table mr-2"></i>
                                                                    <span className="font-medium">Reporte Inventario</span>
                                                                    <Ripple />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a onClick={() => handleNavigation('/items/inventory_kardex')} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                                    <i className="pi pi-search mr-2"></i>
                                                                    <span className="font-medium">Reporte Kardex</span>
                                                                    <Ripple />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => handleNavigation('/orders')}  className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                            <i className="pi pi-users mr-2"></i>
                                                            <span className="font-medium">Pedidos</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => handleNavigation('/sales')}  className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                            <i className="pi pi-users mr-2"></i>
                                                            <span className="font-medium">Ventas</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => handleNavigation('/reports')}  className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                            <i className="pi pi-calendar mr-2"></i>
                                                            <span className="font-medium">Reportes</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => handleNavigation('/configuration')}  className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline">
                                                            <i className="pi pi-cog mr-2"></i>
                                                            <span className="font-medium">Configuracion</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-auto">
                                        <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                                        <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple no-underline">
                                            {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
                                            <span className="font-bold">Username</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                ></Sidebar>
            

            <Button icon="pi pi-align-justify" onClick={() => setVisible(true)} />
            </div>
        </>

    );
}