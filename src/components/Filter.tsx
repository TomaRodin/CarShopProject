import React from "react";
import style from '../styles/style.module.css';
import array from "../carList.json"
import { useState } from "react";
import Car from "./Car"

interface Car {
    id: string,
    make: string,
    model: string,
    version: string,
    fuelType: string,
    price: number,
    isNew: boolean,
    mileage: number,
    firstRegistration: string
}

const Filter = () => {
    const [selectedMaker, setSelectedMaker] = useState("All")
    const [data, setData] = useState(array)
    const [FuelType, setFuelType]: any = useState("All")
    const [model, setModel] = useState("All")
    const [FromYear, setFromYear] = useState("All")
    const [ToYear, setToYear] = useState("All")
    const [FromPrice, setFromPrice] = useState("All")
    const [ToPrice, setToPrice] = useState("All")

    const SelectHandler = (e: any) => {
        setSelectedMaker(e.target.value)
        setModel("All")
    }

    const Make = () => {
        const makes: string[] = [];
        array.map((car: Car) => {
            makes.push(car.make)
        })
        let uniqueArray = [...new Set(makes)]

        return (
            <div>
                <label>Make</label> <br />
                <select onChange={SelectHandler} value={selectedMaker} className={style.Selector1}>
                    <option>All</option>
                    {uniqueArray.map(make => {
                        return (
                            <option>{make}</option>
                        )
                    })}
                </select>

            </div>
        )
    }

    const Model = () => {
        if (selectedMaker === "All" ) {
            const models: string[] = []
            array.map((car: Car) => {
                models.push(car.model)
            })

            let uniqueModels = [...new Set(models)]
            return (
                <div>
                    <label>Model</label>
                    <select className={style.Selector1} value={model} onChange={(e) => {setModel(e.target.value)}}>
                        <option>All</option>
                        {uniqueModels.map(make => {
                                return (
                                    <option>{make}</option>
                                )
                        })}  
                    </select>
                </div>
            )
        }

        else {
            const models: string[] = []
            array.map((car: Car) => {
                if (car.make === selectedMaker) {
                    models.push(car.model)
                }
            })
            let uniqueModels = [...new Set(models)]

            return (
                <div>
                    <label>Model</label>
                    <select className={style.Selector1} value={model} onChange={(e) => {setModel(e.target.value)}}>
                    <option>All</option>
                        {uniqueModels.map(make => {
                                return (
                                    <option>{make}</option>
                                )
                        })}  
                    </select>
                </div>
            )
        }
    }

    const Years = () => {
        const years: number[] = [] 
        for (let i = 1990; i <= 2022; i++) {
            years.push(i)
        }
        return (
            years.reverse().map(year => {
                return <option>{year}</option>
            })
        )
    }

    const Price = () => {
        const price: number[] = [] 
        for (let i = 0; i <= 18; i++) {
            let n = 1+(i/2)
            price.push(n*1000)
        }
        for (let i = 11; i <= 100; i++) {
            price.push(i*1000)
        }
        return (
            price.map(p => {
                return <option>{p}</option>
            })
        )
    }

    const FilteringData = (array: Car[], make: string, model: string, FuelType: string, fromYear: any, toYear: any, fromPrice: any, toPrice: any) => {
        let FilteredArray: Car[] = array
        
        if (make !== "All") {
            FilteredArray = array.filter(car => car.make == make)
        }
        
        if (model !== "All") {
            FilteredArray = FilteredArray.filter(car => car.model === model)
        }
        
        if (FuelType !== "All") {
            FilteredArray = FilteredArray.filter(car => car.fuelType === FuelType)
        }

        if (fromYear !== "All") {
            FilteredArray = FilteredArray.filter(car => car.firstRegistration > fromYear)
        }

        if (toYear !== "All") {
            FilteredArray = FilteredArray.filter(car => car.firstRegistration < toYear)
        }

        if (fromPrice !== "All") {
            FilteredArray = FilteredArray.filter(car => car.price > fromPrice)
        }

        if (toPrice !== "All") {
            FilteredArray = FilteredArray.filter(car => car.price < toPrice)
        }

        setData(FilteredArray)
    }

    return (
        <div className={style.MainContainer}>
            <div className={style.FilterContainer}>
                <div className={style.FContainer}>
                    <h3>Search Criteria</h3>

                    <Make />

                    <Model />

                    <label>Fuel type</label> <br />

                    <select className={style.Selector1} value={FuelType} onChange={(e) => setFuelType(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Gas">Gas</option>
                        <option value="Electric">Electric</option>
                    </select>

                    <br />

                    <label>First Registration</label> <br />

                    <div>    
                        <select className={style.Selector2} value={FromYear} onChange={(e) => setFromYear(e.target.value)} placeholder="From">
                            <option>All</option>
                            <Years />
                        </select>
                        <select className={style.Selector2} value={ToYear} onChange={(e) => setToYear(e.target.value)} placeholder="To">
                            <option>All</option>
                            <Years />
                        </select>
                    </div>

                    <label>Price</label> <br />

                    <div>    
                        <select className={style.Selector2} value={FromPrice} onChange={(e) => setFromPrice(e.target.value)} placeholder="From">
                            <option>All</option>
                            <Price />
                        </select>
                        <select className={style.Selector2} value={ToPrice} onChange={(e) => setToPrice(e.target.value)} placeholder="To">
                            <option>All</option>
                            <Price />
                        </select>
                    </div>
                </div>
            </div>

            <button onClick={() => FilteringData(array, selectedMaker, model, FuelType, FromYear, ToYear, FromPrice, ToPrice)}>F</button>

            <div className={style.DataContainer}>
                <h3>Matching your search criteria</h3>
                <br />
                {data.map((car: Car) => {
                    return <Car data={car} />
                })}
            </div>
        </div>
    )
}

export default Filter;