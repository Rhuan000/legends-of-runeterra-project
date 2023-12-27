import { HomeButtonStyled } from "./home-button.style";

export function HomeButton({children, type, disabled, onClick}){
    return (
        <HomeButtonStyled type={type} disabled={disabled} onClick={onClick}>{children}</HomeButtonStyled>
    )
}