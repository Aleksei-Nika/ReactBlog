import { useParams, useNavigate } from "react-router-dom";

function ArticlePage(){
    const { articleID } = useParams();
    const navigate = useNavigate(); // возвращает функцию с поможью которой можно программно менять URL
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleGoHome = () => {
        navigate('/news');
    };

    return(
        <>
            <button onClick={handleGoBack}>--Назад в ленту</button>
            <div>
                <h1>Вы читаете статью {articleID}</h1>
                <p>здесь полноценный текст статьи</p>
            </div>
            <button onClick={handleGoHome}>На главную ленту</button>
        </>
    );
};

export default ArticlePage;