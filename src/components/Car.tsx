import React from "react";
import style from '../styles/style.module.css';
import dateFormat from "dateformat";
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

interface Props {
    data: Car
}


const Car = (props: Props) => {
    const navigate = useNavigate();
    
    const FormatDate = (date: string): string => {
        const newDate = dateFormat(date,"mm/dd/yyyy")
        return newDate
    }
    
    const Detail = (): void => {
        navigate(`/detail/${props.data.id}`);
    }

    return (
        <div className={style.CarContainer} value={props.data.id} onClick={Detail}>
            <div className={style.Cont}>
                <h4>Listing {props.data.make+" "+ props.data.model+" "+ props.data.version} is available</h4>
                <p className={style.price}>{props.data.price},-€</p>

                <div className={style.DateMil}>
                    <p>{FormatDate(props.data.firstRegistration)}</p>
                    <p>{props.data.mileage} km</p>
                </div>
            </div>
        </div>
    )
}

export default Car;