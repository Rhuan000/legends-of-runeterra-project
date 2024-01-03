import { HomeForm } from "../../components/home-form/home-form.component"
import { HomeHeader } from "../../components/home-header/home-header.component"
import { HomeBackground } from "./home.style"
import { HistoryContext } from "../../contexts/history.context"
import { useContext } from "react"
import { HomeMatchesContainer } from "../../components/home-matches-container/home-matches-container.component"

export function Home(){
    const historyContext = useContext(HistoryContext).currentHistory
    console.log(historyContext)
    

    return(
        <HomeBackground>
            <HomeHeader/>
            {
                historyContext ? <HomeMatchesContainer></HomeMatchesContainer> : <HomeForm/> 
                    
             }
            
        </HomeBackground>
    )
}