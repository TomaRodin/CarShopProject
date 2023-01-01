// App.tsx
import React from 'react';
import styles from './styles/style.module.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import List from './components/List';
import Detail from './components/Detail';

export const App: React.FC = () => (
  <>    
  <div className={styles.container}>
    <Header />
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} /> 
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>

  </div>
  </>
);
