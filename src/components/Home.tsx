import React from "react";
import style from "../styles/style.module.css";
import array from "../carList.json"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Home = (props: any) => {
    const [selectedMaker, setSelectedMaker] = useState("All")
    const [selectedModel, setSelectedModel] = useState("All")
    const navigate = useNavigate();

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
    const SelectHandlerModel = (e: any) => {
        setSelectedModel(e.target.value)
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
                    <select className={style.Selectors} onChange={SelectHandlerModel} value={selectedModel}>
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
                    <select className={style.Selectors} onChange={SelectHandlerModel} value={selectedModel}>
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

    const handleSearch = () => {
        props.setSelectedMaker(selectedMaker)
        props.setModel(selectedModel)

        navigate("/list")
    }

    return (
        <div>
            <div className={style.SearchContainer}>
                <h3>Search cars by make and model:</h3>

                <div className={style.SelectContainer}>
                    <SelectMake />
                    <SelectModel />
                    <button className={style.SearchButton} onClick={handleSearch}>Search</button>
                </div> 
            </div>
        </div>
    )
}

export default Home;