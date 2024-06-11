import React, { useEffect, useState } from 'react';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './../Login.css';

export default function LoginComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function handleLogin(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {

            // Tiempo de expiracion del token de logeo
            const tokenLifespan = 3600; 
            const expirationTime = Date.now() + tokenLifespan * 1000;

            localStorage.setItem('token', data.access_token);
            localStorage.setItem('token_expiration', expirationTime);
            localStorage.setItem('type_user', data.tipo_usuario);
            setSuccessMessage('Inicio de sesión exitoso');
            setErrorMessage('');
            // Redirigir a la página protegida o a la página de inicio
            window.location.href = '/home';
        } else {
            setErrorMessage(data.message);
            setSuccessMessage('');
        }
    }

    return (
        <div className="login-container">
            <div className="card">
                <h1 id="h1-n1">HealthCare Innovations</h1>
                <form onSubmit={handleLogin} className="p-fluid">
                    <h2 className="title">Iniciar Sesión</h2>

                    <div className="field">
                        <label htmlFor="email" className="p-sr-only">Email</label>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese Correo" />
                    </div>

                    <div className="field">
                        <label htmlFor="password" className="p-sr-only">Contraseña</label>
                        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese Contraseña" />
                    </div>

                    {errorMessage && <Message className="message message-error" severity="error" text={errorMessage} />}
                    {successMessage && <Message className="message message-success" severity="success" text={successMessage} />}

                    <Button id="iniciar" label="Ingresar" type="submit" />
                </form>
            </div>
        </div>
    );
}