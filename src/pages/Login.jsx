import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // если шел в кабинет после авторизации вернем в кабинет
    // если зашел на логин сам, то перенаправим на /news
    const fromPage = location.state?.from?.pathname || '/news' ;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); //сброс старых ошибок
        if (!username.trim() || !password.trim()){
            setError('Все поля должны быть заполнены');
            return;
        };
        const result = login(username, password);
        if (result.succses){
            // перенаправляем туда, куда шел изначально
            navigate(fromPage, {replace: true });
        } else{
            setError(result.message);
        };
    };
    return (
        <div style={{maxWadth: '400px', margin: '50px auto'}}>
            <h2>Войти в аккаунт</h2>
            {error && <p style={{colore: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Войти</button>
            </form>
            <p>Ещё нет аккаунта? <Link to='/register'>Зарегистрироваться</Link></p>

        </div>
    );
};
export default Login;