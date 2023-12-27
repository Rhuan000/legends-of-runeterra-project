import { HomeInputStyled, HomeLabelStyled } from "./home-input.style"
import { useState } from "react";

export function HomeInput({placeholder, type, id, name, onChange}){
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        onChange(e)
        setInputValue(e.target.value);
    };

    return (
            <div style={{position: 'relative', display: 'flex'}}>
                <HomeInputStyled type={type} id={id} name={name} onChange={handleInputChange}></HomeInputStyled>
                <HomeLabelStyled hasValue={inputValue}>Nome</HomeLabelStyled>
            </div>
    )
}