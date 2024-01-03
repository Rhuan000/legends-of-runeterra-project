import { useContext, useState } from "react";
import { RegionsIcon } from "../regions-icon/regions-icon.component";
import {  HomeMatchCardStyled, MatchCardPlayerDiv, MatchCardRegionIcon, MatchCardSpanDate, MatchCardSpanTime, MatchCardSpanX } from "./home-match-card.style";
import { HistoryContext } from "../../contexts/history.context";
import { HomeCardsContainer } from "../home-cards-container/home-cards-container.component";

export function HomeMatchCard({history}){
    const [cardsOpen, setCardsOpen] = useState(false)
    const game = history.game
    
    const date = new Date(history.game.time)
    const player1 = history.player1
    const player2 =  history.player2
    function matchClicked(){
        setCardsOpen(!cardsOpen)
    }
    
    function championBackground(deck){
        if(deck){
            for(let card of deck){
                if(card.rarity == "Champion"){
                    return card.assets[0].fullAbsolutePath
                } 
            }
        }
    }

    const backgroundPlayer1 = player1 && championBackground(player1.deck)
    const backgroundPlayer2 = player2 && championBackground(player2.deck)
    console.log(cardsOpen)

    return (
        <div style={{position: "relative", height: `${cardsOpen ? "1000px" : "160.10px"}`,  transition: "1s", overflow: "hidden"}} >
            <HomeMatchCardStyled onClick={matchClicked}>
                <MatchCardSpanDate>  
                    {date.getDate()} / {date.getMonth()+1} / {date.getFullYear()}              
                </MatchCardSpanDate>
                <MatchCardSpanTime>
                    {date.getHours()}:{date.getMinutes()}
                </MatchCardSpanTime>
                    <MatchCardPlayerDiv win={player1.game_result === "win" ? "0" : "1"} style={{borderRight: "1px solid #3559E0"}} >
                        { backgroundPlayer1 && 
                            <div style={{backgroundImage: `url(${backgroundPlayer1})`, zIndex: "0", width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat"}}></div>
                        }

                    
                        { player1 &&
                        <>
                            <span style={{color: "#37a9da",fontWeight: "bolder" ,zIndex: "2",position:"absolute", top:"75%", width: "100%", textAlign: "center"}}>{player1.name} {player1.tag}</span>
                        </>
                        }
                        {
                            player1.factions.map((factions, i) => <MatchCardRegionIcon backgroundImage={factions} style={{height: "35px", width: "35px",  position: "absolute", zIndex: "2", left: 0+i*8+ "%"}}/>)
                        }
                    </MatchCardPlayerDiv>
                    
            
                <MatchCardSpanX>X</MatchCardSpanX>

                <span style={{position: "absolute", fontWeight: "bolder", left: "47.5%",color: "white", zIndex: "2", top: "2%", minWidth: "50px", textAlign: "center"}}>{game.type}</span>
                
                <MatchCardPlayerDiv style={{borderLeft: "1px solid #3559E0"}} win={player2.game_result && player2.game_result === "win" ? "0" : "1"}>
                <>
                    { backgroundPlayer2 && 
                        
                        <div style={{backgroundImage: `url(${backgroundPlayer2})`, zIndex: "0", width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat"}}></div>
                    }
                    { player2 &&
                        <>
                        <span style={{color: "#37a9da",fontWeight: "bolder" ,zIndex: "2",position:"absolute", top:"75%", textAlign: "center"}}>{player2.name} {player2.tag}</span>
                    </>
                        }
                    {
                        player2.factions?.map((faction, i) => <MatchCardRegionIcon style={{height: "35px", width: "35px", position:"absolute", left: 80+i*8+ "%"}} backgroundImage={faction}/>)
                    }
                    </>
                </MatchCardPlayerDiv>
            </HomeMatchCardStyled>
            <div style={{display: "flex", opacity: `${cardsOpen ? "1" : "0" }`, height: "auto", transition: "1s"}}>
                <HomeCardsContainer deck_player={player1?.deck} style={{borderRight: "2px solid #3559E0"}}></HomeCardsContainer>
                <HomeCardsContainer deck_player={player2?.deck}></HomeCardsContainer>
            </div>
        </div>
    )
}