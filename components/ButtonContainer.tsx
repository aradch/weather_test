import React, {Dispatch, SetStateAction} from 'react';
import styles from "../pages/main/main.module.css";

type PropsType = {
    isActive: boolean
    value: string
    setActiveCity: Dispatch<SetStateAction<string>>
}

const ButtonContainer = ({isActive, value, setActiveCity}: PropsType) => {

    const choseActiveCity = () =>{
        localStorage.setItem('currentCity', value)
        setActiveCity(value)
    }

    return (
        <button className={`${styles.button} ${isActive && styles.activeButton}`}
                onClick={choseActiveCity}>{value}</button>
    );
};

export default ButtonContainer;