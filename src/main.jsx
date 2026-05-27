import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BlogLayout from './layouts/BlogLayout';
import NewsFeed from './pages/NewsFeed';
import About from './pages/About';
import ArticlePage from './pages/ArticlePage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NoteFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ArticleForm from './pages/ArticleEdit';

import ProtecterRoute from './layouts/ProtectedRout';
import { AuthProvider } from './contex/AuthContex';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <Routes>
        {/* ПРАВИЛО РЕДИРЕКТА: если пользователь зашел просто на сайт ("/")
        http://localhost/ мы автоматически перенаправляем в ленту новостей /news
        replace - указываетс что страницу "/" не нужно сохранять в историю переходов*/}
        <Route path='/' element={<Navigate to="/news" replace/>}/>
        <Route path='/' element={<BlogLayout />}>
          <Route path='news' element={<NewsFeed />} />
          <Route path='about' element={<About />} />
          <Route path='news/:articleID' element={<ArticlePage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          {/*ЗАЩИЩЕННЫЙ РОУТ КАБИНЕТ */}
          <Route path='dashboard' element={<ProtecterRoute><Dashboard /></ProtecterRoute>} >
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
            <Route path='create-article' element={<ArticleForm />} />
            <Route path='edit-article/:articleID' element={<ArticleForm />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  </AuthProvider>
)
