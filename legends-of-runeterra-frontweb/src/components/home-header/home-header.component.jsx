import { HomeHeaderStyled } from "./home-header.style";
import { RegionsIcon } from "../regions-icon/regions-icon.component";
import regions from "../../data/regions-icon.json";

export function HomeHeader(){
    return(
        <HomeHeaderStyled>
            <h1 style={{color: 'white',position: "absolute", top: '-15px', left: '44%'}}>Lor History</h1>
            {
                regions.map((region,i) => (<RegionsIcon backgroundImage={region} key={i}/>)
                )
            }
        
        </HomeHeaderStyled>
    )
}