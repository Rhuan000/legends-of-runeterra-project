import { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function processFactionIconPath(namesArray) {
    if(namesArray){

        const processedNames = namesArray.map((name) => {
          // Use regular expressions to remove "faction_" and "_Name"
          var processedName = name.replace(/^faction_|_Name$/g, '').toLowerCase();
        
          if(processedName == "piltover"){
            processedName = "piltoverzaun"
          }else if(processedName == "card_08ru014"){
            processedName = "runeterra"
          }else if(processedName == "mttargon"){
            processedName = "targon"
          }else if(processedName == "bard"){
            processedName = "runeterra"
          }else if(processedName == "jax"){
            processedName = "runeterra"
          }else if(processedName == "varus"){
            processedName = "runeterra"
          }
          // Convert the remaining center word to lowercase
          const path = `http://dd.b.pvp.net/4_12_0/core/en_us/img/regions/icon-${processedName}.png`
          return path;
        });
        return processedNames
    }
}

export const HistoryContext = createContext({
    setCurrentHistory: () => null,
    currentHistory: null,
})



export const HistoryProvider = ({children}) => {
    //const navigate = useNavigate()
    const [currentHistory, setCurrentHistory] = useState(null)
    const [historyFactions, setHistoryFactions] = useState(null)
    const [formatedHistory, setFormatedHistory] = useState("")
    const value = {currentHistory, setCurrentHistory, formatedHistory, setFormatedHistory}

    useEffect(()=>{
        if(currentHistory){
            const FORMATEDHISTORY = []
            for(let history of currentHistory){
            var player1  = {}
            var player2 = {}
            var users = 1
            console.log(history.metadata.metadata.participants[0], history.users_information[0].puuid)
            if(history.metadata.metadata.participants[0] === history.users_information[0].puuid){
                console.log("true", history.users_information[0].gameName, "player 1")
                player1 =  {
                    name: history.users_information[0].gameName,
                    tag: history.users_information[0].tagLine,
                    puuid: history.users_information[0].puuid,
                    game_result: history.metadata.info.players[0].game_outcome,
                    deck: history.decoded_decks[0],
                    deck_code: history.metadata.info.players[0].deck_code,
                    factions: processFactionIconPath(history.metadata.info.players[0].factions),
                    order_of_play: history.metadata.info.players[0].order_of_play
                }
                if(history.metadata.metadata.participants.length > 1){

                    player2 =  {
                        name: history.users_information[1].gameName,
                        tag: history.users_information[1].tagLine,
                        puuid: history.users_information[1].puuid,
                        game_result: history.metadata.info.players[1].game_outcome,
                        deck: history.decoded_decks[1],
                        deck_code: history.metadata.info.players[1].deck_code,
                        factions: processFactionIconPath(history.metadata.info.players[1].factions),
                        order_of_play: history.metadata.info.players[1].order_of_play
                    } 
                }
            }
            else if (history.metadata.metadata.participants.length > 1 ){
                users = 2
                player1 =  {
                    name: history.users_information[1].gameName,
                    tag: history.users_information[1].tagLine,
                    puuid: history.users_information[1].puuid,
                    game_result: history.metadata.info.players[0].game_outcome,
                    deck: history.decoded_decks[0],
                    deck_code: history.metadata.info.players[0].deck_code,
                    factions: processFactionIconPath(history.metadata.info.players[0].factions),
                    order_of_play: history.metadata.info.players[0].order_of_play
                } 
                player2 =  {
                    name: history.users_information[0].gameName,
                    tag: history.users_information[0].tagLine,
                    puuid: history.users_information[0].puuid,
                    game_result: history.metadata.info.players[1].game_outcome,
                    deck: history.decoded_decks[1],
                    deck_code: history.metadata.info.players[1].deck_code,
                    factions: processFactionIconPath(history.metadata.info.players[1].factions),
                    order_of_play: history.metadata.info.players[1].order_of_play
                } 
                console.log("false", history.users_information[0].gameName, "player 2")
            }
            FORMATEDHISTORY.push(
                {   
                    users: users, 
                    game: {
                        time: history.metadata.info.game_start_time_utc,
                        type: history.metadata.info.game_type,
                    },
                    player1,
                    player2
                }
            )
        }
        setFormatedHistory(FORMATEDHISTORY)
    }
    }, [currentHistory])

    return <HistoryContext.Provider value={value} children={children}/>
}