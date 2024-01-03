import { HomeCardsBackground, HomeCard } from "./home-cards-container.style"
export function HomeCardsContainer(props){
    const deck_player = props.deck_player
    return (
        <HomeCardsBackground {...props}>
            {
                deck_player?.map(card => {
                    return <HomeCard background={card.assets[0].gameAbsolutePath}></HomeCard>
            })
            }
        </HomeCardsBackground>
    )
}