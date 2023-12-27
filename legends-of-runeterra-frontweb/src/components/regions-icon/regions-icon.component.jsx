import { RegionsBIStyled } from "./regions-icon.style"

export function RegionsIcon(props){
    const backgroundImage = props.backgroundImage
    return (
        <RegionsBIStyled style={{height: "50px", width: "50px"}}{...props} backgroundimageurl={backgroundImage.toString()}/>
    )
}