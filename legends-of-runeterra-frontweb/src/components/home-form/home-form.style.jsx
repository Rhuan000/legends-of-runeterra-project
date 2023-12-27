import styled from 'styled-components';
import { ReactComponent as LoadingSVG } from "../../data/load.svg"

export const HomeFormBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`
export const HomeFormStyled = styled.form`
    padding: 2rem;
    border-radius: 5px;
    border: solid 1px rgb(0,0,0,0.3);
    background-color: #000000bd;
    box-shadow: 0px 100px 300px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
`

export const LoadSVG = styled(LoadingSVG)`
    height: 1rem;
`