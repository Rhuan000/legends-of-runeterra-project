import styled from  "styled-components"

export const RegionsBIStyled = styled.div`
    display: block;
    margin: 2rem;
    margin-top: 3.3rem;
    z-index: 1; 
    font-weight: bolder;
    background-image:url(${props => {return props.backgroundimageurl}});
    background-size: cover;
    background-color: rgb(0,0,0, 0.5);
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
`