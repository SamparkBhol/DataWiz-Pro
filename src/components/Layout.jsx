import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <ChatBot />
    </div>
  );
};

export default Layout;