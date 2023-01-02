// App.tsx
import React from 'react';
import styles from './styles/style.module.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Filter from './components/Filter';
import Detail from './components/Detail';
import { useState } from 'react';
import array from './carList.json'


export const App: React.FC = () => {
  const [selectedMaker, setSelectedMaker] = useState("All")
  const [data, setData] = useState(array)
  const [FuelType, setFuelType]: any = useState("All")
  const [model, setModel] = useState("All")
  const [FromYear, setFromYear] = useState("All")
  const [ToYear, setToYear] = useState("All")
  const [FromPrice, setFromPrice] = useState("All")
  const [ToPrice, setToPrice] = useState("All")

  return (
    <>    
    <div className={styles.container}>
      <Header />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setSelectedMaker={setSelectedMaker} setModel={setModel} />} />
          <Route path="/list" element={<Filter selectedMaker={selectedMaker} setSelectedMaker={setSelectedMaker} data={data} setData={setData} FuelType={FuelType} setFuelType={setFuelType} model={model} setModel={setModel} FromYear={FromYear} setFromYear={setFromYear} ToYear={ToYear} setToYear={setToYear} FromPrice={FromPrice} setFromPrice={setFromPrice} ToPrice={ToPrice} setToPrice={setToPrice} />} />  
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>

    </div>
    </>
  )
};
