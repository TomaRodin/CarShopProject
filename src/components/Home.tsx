import React from "react";
import style from "../styles/style.module.css";
import array from "../carList.json"
import { useState } from "react";

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

const Home = () => {
    const [selectedMaker, setSelectedMaker] = useState("All makes")

    const SelectMake = () => {
        const SelectHandler = (e: any) => {
            setSelectedMaker(e.target.value)
        }

        const makes: string[] = [];
        array.map((car: Car) => {
            makes.push(car.make)
        })
        let uniqueArray = [...new Set(makes)]
        
        console.log(uniqueArray)
        return (
            <div>
                <select onChange={SelectHandler} value={selectedMaker} className={style.Selectors}>
                    <option>All makes</option>
                    {uniqueArray.map(make => {
                        return (
                            <option>{make}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    const SelectModel = () => {
        if (selectedMaker === "All makes" ) {
            const models: string[] = []
            array.map((car: Car) => {
                models.push(car.model)
            })

            let uniqueModels = [...new Set(models)]
            return (
                <div>
                    <select className={style.Selectors}>
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
                    <select className={style.Selectors}>
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

    return (
        <div>
            <div className={style.SearchContainer}>
                <h3>Search cars by make and model:</h3>

                <div className={style.SelectContainer}>
                    <SelectMake />
                    <SelectModel />
                    <button className={style.SearchButton}>Search</button>
                </div> 
            </div>
        </div>
    )
}

export default Home;