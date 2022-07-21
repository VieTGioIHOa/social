import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import './App.css'
import Auth from './components/Auth/Auth'
import SearchModal from './components/ModalsOnMob/SearchModal'
import CUPostModal from './components/ModalsOnMob/CUPostModal'
import SearchPage from './page/SearchPage';
import HomePage from './page/HomePage';
import PostDetailPage from './page/PostDetailPage';

export default function App() {
    return (
        <BrowserRouter>
            <div className="container xl:w-[1200px] transition-all select-none sm:select-text">
                <SearchModal />
                <CUPostModal />
                <ToastContainer
                    className="sm:w-[320px] w-[200px]"
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/posts" element={<HomePage />} />
                    <Route path="/posts/search" element={<SearchPage />} />
                    <Route path="/posts/:id" element={<PostDetailPage />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
