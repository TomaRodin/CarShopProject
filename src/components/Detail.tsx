import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import style from "../styles/style.module.css";
import array from "../carList.json"

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

const Detail = () => {
    const params = useParams();
    const [data, setData]: any = useState({});
    
    useEffect(() => {
        const data = array.find((car: Car) => car.id === params.id)
        setData(data);
    },[])

    const Condition = (isNew: boolean) => {
        if (isNew) {
            return <p>New</p>
        }
        else {
            return <p>Used</p>
        }
    }

    return (
        <div className={style.DetailMainContainer}>
            <div>
                <br />
                <div className={style.InfoContainer}>
                    <h1>{data.make} {data.model}</h1>
                    <p>{data.version}</p>
                    <h1>{data.price}, -€</h1>
                    <div>
                        <div className={style.InfoRegFuel}>
                            <div>
                                <h4>Registration date</h4>
                                <p>{data.firstRegistration}</p>
                            </div>
                            <div>
                                <h4>Fuel type</h4>
                                <p>{data.fuelType}</p>
                            </div>
                        </div>
                        <div className={style.InfoRegFuel}>
                            <div>
                                <h4>Mileage</h4>
                                <p>{data.mileage} km</p>
                            </div>
                            <div>
                                <h4>Condition</h4>
                                <p>{Condition(data.isNew)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
            </div>
        </div>
    )
}

export default Detail;