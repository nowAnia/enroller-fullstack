import {useState} from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm({onLogin, buttonLabel}) {
    const [email, setEmail] = useState('');


    async function handleAddingNewParticipant() {
        if (email.trim() === '') {
           toast.error('Trzeba wprowadzić email');
            return;
        }
        if (!email.includes('@')) {
            toast.error('Nieprawidłowy adres e-mail – brakuje "@"');
            return;
        }
        const response = await fetch('/api/participants', {
            method: 'POST',
            body: JSON.stringify({login: email}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log("participant added")
        }
        onLogin(email)
    }

    return <div>
        <label>Zaloguj się e-mailem</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button type="button" onClick={handleAddingNewParticipant}>
            {buttonLabel || 'Wchodzę'}</button>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>;
}
