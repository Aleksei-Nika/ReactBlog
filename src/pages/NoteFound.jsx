import { Link } from "react-router-dom";

function NoteFound(){
    return(
        <>
            <h1>Ошибка 404</h1>
            <p>Страница, которую вы ищите, нет</p>
            <Link to='/news'>Вернуться в ленту новостей</Link>
        </>
    );
};

export default NoteFound;