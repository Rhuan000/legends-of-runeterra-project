import styled from "styled-components"

export const HomeInputStyled = styled.input`
    position: relative;
    background-color:  rgb(100, 100, 100, 0.5);
    border-color:  rgb(100, 100, 100, 0.5);
    border: 1px solid black;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    color: white;
    padding-left: 0.5rem;
    &:focus {
        outline: none;
    }

    &:focus + label {
        top: -45%;
        
        font-size: 15px; // Move the label outside when the input is focused
    }
`
export const HomeLabelStyled = styled.label`
    position: absolute;
    font-size: 12px;
    top: 45%;
    color: white;
    left: 8px;
    transform: translateY(-50%);
    font-weight: bolder;
    pointer-events: none; // Ensure the label doesn't interfere with input interaction
    transition: all 0.3s; // Add a transition for smooth animation
    opacity: ${(props) => (props.hasValue ? 0 : 1)};
`;