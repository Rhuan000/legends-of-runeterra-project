import styled from "styled-components"

export const HomeCardsBackground = styled.div`
    display: flex;
    flex-wrap: wrap;
    top: 126px;
    width: 50%;
    justify-content: start;
    height: 100%;
`
export const HomeCard = styled.div`
    height: 104.5px;
    width: 69.25px;
    margin-left: 2rem;
    margin-top: 2rem;
    background-image: url(${(props) => props?.background});
    background-size: cover;
    background-position: center;
    transition: 0.2s;
    &:hover {
        transform: scale(2);
        z-index: 2;
    }
`