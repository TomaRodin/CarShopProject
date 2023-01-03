import React, { useEffect, useState } from "react";
import style from '../styles/style.module.css';
import array from "../carList.json"
import CarContainer from "./Car"

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

interface Props {
   selectedMaker: string,
   data: Car[],
   FuelType: string,
   model: string,
   FromYear: string,
   ToYear: string,
   FromPrice: string,
   ToPrice: string,
   setSelectedMaker: (a: string) => void 
   setData: (a: Car[]) => void
   setFuelType: (a: string) => void
   setModel: (a: string) => void
   setFromYear: (a: string) => void
   setToYear: (a: string) => void
   setFromPrice: (a: string) => void
   setToPrice: (a: string) => void
}

const Filter = (props: Props) => {
    const [FirstYear, setFirstYear]: any = useState(1990)

    const SelectHandler = (e: any) => {
        props.setSelectedMaker(e.target.value)
        props.setModel("All")
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
                <select onChange={SelectHandler} value={props.selectedMaker} className={style.Selector1}>
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

    useEffect(() => {
        FilteringData(array, props.selectedMaker, props.model, props.FuelType, props.FromYear, props.ToYear, props.FromPrice, props.ToPrice)
    },[props.selectedMaker, props.model, props.FuelType, props.FromYear, props.ToYear, props.FromPrice, props.ToPrice])

    const Model = () => {
        if (props.selectedMaker === "All" ) {
            const models: string[] = []
            array.map((car: Car) => {
                models.push(car.model)
            })

            let uniqueModels = [...new Set(models)]
            return (
                <div>
                    <label>Model</label>
                    <select className={style.Selector1} value={props.model} onChange={(e) => {props.setModel(e.target.value)}}>
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
                if (car.make === props.selectedMaker) {
                    models.push(car.model)
                }
            })
            let uniqueModels = [...new Set(models)]

            return (
                <div>
                    <label>Model</label>
                    <select className={style.Selector1} value={props.model} onChange={(e) => {props.setModel(e.target.value)}}>
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
        for (let i = 1990; i <= 2023; i++) {
            years.push(i)
        }
        return (
            <>
                {years.reverse().map(year => {
                    return <option>{year}</option>
                })}
            </>
        )
    }

    const YearsVariable = () => {
        const years: number[] = [] 

        const FYear = Number(FirstYear)+1

        for (let i = FYear; i <= 2023; i++) {
            years.push(i)
        }
        return (
            <>
                {years.reverse().map(year => {
                    return <option>{year}</option>
                })}
            </>
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
            <>
                {price.map(p => {
                    return <option>{p}</option>
                })}
            </>
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

        props.setData(FilteredArray)
    }

    const AllCars = () => {
        if (props.data.length < 1) {
            return (
                <p>0 cars match this criteria</p>
            )
        }
        else {
            return (
                <>
                    {props.data.map((car: Car) => {
                        return <CarContainer data={car} />
                    })}
                </>
            )
        }
    }

    const handleChangeYear = (e: any) => {
        setFirstYear(e.target.value)
    }

    return (
        <div className={style.MainContainer}>
            <div className={style.FilterContainer}>
                <div className={style.FContainer}>
                    <h3>Search Criteria</h3>

                    <Make />

                    <Model />

                    <label>Fuel type</label> <br />

                    <select className={style.Selector1} value={props.FuelType} onChange={(e) => props.setFuelType(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Gas">Gas</option>
                        <option value="Electric">Electric</option>
                    </select>

                    <br />

                    <label>First Registration</label> <br />

                    <div>    
                        <select className={style.Selector2} value={props.FromYear} onChange={(e) => {props.setFromYear(e.target.value); handleChangeYear(e)}} placeholder="From">
                            <option>All</option>
                            <Years />
                        </select>
                        <select className={style.Selector2} value={props.ToYear} onChange={(e) => props.setToYear(e.target.value)} placeholder="To">
                            <option>All</option>
                            <YearsVariable />
                        </select>
                    </div>

                    <label>Price</label> <br />

                    <div>    
                        <select className={style.Selector2} value={props.FromPrice} onChange={(e) => props.setFromPrice(e.target.value)} placeholder="From">
                            <option>All</option>
                            <Price />
                        </select>
                        <select className={style.Selector2} value={props.ToPrice} onChange={(e) => props.setToPrice(e.target.value)} placeholder="To">
                            <option>All</option>
                            <Price />
                        </select>
                    </div>
                </div>
            </div>

            <div className={style.DataContainer}>
                <h3>Matching your search criteria</h3>
                <br />
                <AllCars />
            </div>
        </div>
    )
}

export default Filter;