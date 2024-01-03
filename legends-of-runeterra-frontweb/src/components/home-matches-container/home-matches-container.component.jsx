import { HomeMatchCard } from "../home-match-card/home-match-card.component"
import { HomeMatchesContainerDivStyled } from "./home-matches-container.style"
import { HistoryContext } from "../../contexts/history.context";
import { useContext } from "react";

export function HomeMatchesContainer(){
    const historyContext = useContext(HistoryContext)
    const data = historyContext.currentHistory 

    const histories = historyContext.formatedHistory
    console.log(histories)

    return (
        <>
        { histories && 

            <HomeMatchesContainerDivStyled>
                {
                    histories.map(history => {
                      return <HomeMatchCard  history={history}/>
                    }) 
                }
            </HomeMatchesContainerDivStyled>
        }
        </>
    )
}