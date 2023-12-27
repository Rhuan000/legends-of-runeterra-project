import styled from "styled-components"

export const HomeSelectStyled = styled.select`
    border: 1px solid black;
    border-radius: 0px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color:  rgb(100, 100, 100, 0.5);
    background-color: #3559E0;
    padding: 0.2rem;
    &:focus {
        background-color: #3559E0;
        color: white;        
    }
    &:hover {
        background-color: #3559E0;
        transform: scale(1.02);
    }
`
export const HomeOptionStyled = styled.option`

`