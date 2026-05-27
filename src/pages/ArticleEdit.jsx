import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";

function ArticleForm(){
    const { currentUser } = useAuth();
    const { articleID } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('javascript');
    const [description, setDescription] = useState('');

    const [error, setError] = useState('');
    const isEditMode = Boolean(articleID);

    useEffect(() => {
        if (isEditMode) {
            const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
            const articleEdit = articles.find(a => a.id === articleID);
            if(!arcticle){
                setError('Статья не найдена');
                return;
            }
            // ЖЕСТКАЯ ПРОВЕРКА: именно автор пытается редактировать
            if (articleEdit.authorID !== currentUser.id){
                alert('ВЫ МОЖЕТЕ РЕДАКТИРОВАТЬ ТОЛЬКО СВОИ СТАТЬИ');
                navigate('/news');
                return
            }
            setTitle(articleEdit.title);
            setCategory(articleEdit.category);
            setDescription(articleEdit.description);
        }
    }, [articleID, currentUser, isEditMode, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!title.tirim() || !description.trim()){
            setError('Все поля должны быть заполнены');
            return;
        }
        const article = JSON.parse(localStorage.getItem('blog_articles') || '[]');
        if(isEditMode){
            const updateArticle = article.map(a => {
                if(a.id === articleID){
                    return{
                        ...a,
                        title,
                        category,
                        description
                    };
                }
                return a;
            });
            localStorage.setItem('blog_articles', JSON.stringify(updateArticle));
        }else{
            const newArticle = {
                id: Date.now().toString(),
                title,
                category,
                description,
                authorID: currentUser.id,
                authorName: currentUser.username
            };
            arcticles.unshift(newArticle);
            localStorage.setItem('blog_articles', JSON.stringify(articles));
        }
        navigate('/news');
    };
    return (
        <div>
            <h2>{isEditMode ? "Редактировать статью" : "Создать статью"}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите заголовок"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Введите заголовок"
                />
                <textarea
                    rows='10'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введите текст статьи"
                />
                <button type="submit">Сохранить</button>
                <button onClick={navigate('/news')}>
                    Отмена
                </button>
            </form>
        </div>

    );
}
export default ArticleForm;