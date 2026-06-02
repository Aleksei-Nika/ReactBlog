import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ArticlePage(){
    const { articleID } = useParams();
    const navigate = useNavigate(); // возвращает функцию с поможью которой можно программно менять URL
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const savedArticles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
        const foundArticle = savedArticles.find(a => a.id === articleID);
        setArticle(foundArticle);
    }, [articleID]);

    const handleGoBack = () => {
        navigate(-1);
    };
    const handleGoHome = () => {
        navigate('/news');
    };

    if (!article) {
        return (
            <>
                <h2>Статья не найдена</h2>
                <button onClick={handleGoHome}>На главную ленту</button>
            </>
        )
    }
    return(
        <>
            <button onClick={handleGoBack}>--Назад в ленту</button>
            <div>
                <h1>{article.title}</h1>
                <span>Категория: {article.category}</span>
                <span>Автор: {article.autohorName}</span>
                <hr />
                <p>здесь полноценный текст статьи</p>
            </div>
            <button onClick={handleGoHome}>На главную ленту</button>
        </>
    );
};

export default ArticlePage;