import styled from "styled-components"
import background from "../home/udyr-bg.jpg"

export const HomeBackground = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-image: url(${background}); 
    background-size: cover;
    min-height: 600px;
    background-color: rgb(3, 8, 23);
`