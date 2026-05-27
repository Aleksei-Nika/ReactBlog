import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); //сброс старых ошибок
        setSuccess('');
        if (!username.trim() || !password.trim()){
            setError('Все поля должны быть заполнены');
            return;
        };
        const result = register(username, password);

        if (result.success){
            // перенаправляем туда, куда шел изначально
            setSuccess(result.message);
            setTimeout(() =>{
                navigate('/login');
            }, 2000);
        } else {
            setError(result.message);
        };
    };
    return (
        <div style={{maxWadth: '400px', margin: '50px auto'}}>
            <h2>Регистрация</h2>
            {error && <p style={{colore: 'red'}}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт? <Link to='/login'>Войти в аккаунт</Link></p>
        </div>
    );
};
export default Register;