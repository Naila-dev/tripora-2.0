import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login({ onSwitchToRegister, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password); // Capture the response
            
            // Check the user's role from the response
            const role = res.data.user.role;

            if (onSuccess) onSuccess(); // Close the modal on success

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin'); // Redirect admin to the dashboard
            } else {
                navigate('/'); // Redirect regular users to the homepage
            }
        } catch (err) {
            alert('Login failed: ' + err.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>
            <input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="form-control" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn-submit">Login</button>
            <p className="auth-switch-text">
                Don't have an account? <button type="button" onClick={onSwitchToRegister} className="auth-switch-button">Register</button>
            </p>
        </form>
    );
}
