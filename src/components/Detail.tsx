import { useParams } from "react-router-dom";
import React from "react"
import style from "../styles/style.module.css";

const Detail = () => {
    const params = useParams();

    return (
        <div className={style.DetailMainContainer}>
            <div>
                <br />
                <div className={style.InfoContainer}>
                    <h1>Name</h1>
                    <p>Type</p>
                    <h1>Price</h1>
                </div>
                <br />
            </div>
        </div>
    )
}

export default Detail;