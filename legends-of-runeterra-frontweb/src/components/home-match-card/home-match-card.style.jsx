import styled from "styled-components"
import { RegionsIcon } from "../regions-icon/regions-icon.component"

export const HomeMatchCardStyled = styled.div`
    position: relative;
    display: flex;
    min-height: 135px;
    margin: 0.8rem;
    background-color: rgb(0,0,0, 1);
    border: 1px solid #3559E0;
    margin-bottom: 0.01rem;
    border-radius: 5px;
    overflow: hidden;

    &:hover{
        background-color: rgb(10, 10, 10,1);
        cursor: pointer;
    }
`
export const MatchCardRegionIcon = styled(RegionsIcon)`
    margin: 0.4rem;
    height: 25px;
    width: 25px;
    background-color: rgb(0,0,0,0.5);
`

export const MatchCardSpanDate = styled.span`
    color: #4CB9E7; 
    font-weight: bolder; 
    position: absolute;
    left: 1%;
    top: 5%;
    font-size: 11px;
    z-index: 2;
`
export const MatchCardSpanTime = styled.span`
    margin-left: 2rem;
    font-weight: bolder;
    position: absolute; 
    left: 10%;
    top: 5%;
    color: #FFECD6; 
    font-size: 11px;
    z-index: 2;
`
export const MatchCardSpanX = styled.span`
    font-size: 25px;
    font-weight: bold; 
    color: white;
    left: 49.2%;
    top: 34%;
    position: absolute; 
    z-index: 2;
    font-family: 'Bad Script';
`

export const MatchCardPlayerDiv = styled.div`
    position: relative;
    display: flex;
    min-height: 100%;
    max-height: 135px;
    width: 50%;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: top;
    border-radius: 4px;
    filter: grayscale(${(props) => props.win * 100}%);

    &:hover::before {
        background-color: rgb(0,0,0, 0.2);
        
    }
    &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgb(0,0,0,0.6);
        z-index: 2;
    }
`
