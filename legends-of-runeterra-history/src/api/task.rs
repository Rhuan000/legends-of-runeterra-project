use actix_web::{
    web::Json,
};

use serde::{Deserialize, Serialize};
use crate::{
    card_translator::{converter::get_translated_cards, card::Card},
    deck_decoder::decoder,
    riot_api::{
        game_name_request::game_name_request,
        history_request::history_request,
        match_request::{all_matches_history_request, MatchResponse}, 
    },
};

use super::user_name_tag::User;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FullMatch {
    users_information: Vec<User>,    
    metadata: MatchResponse,
    decoded_decks: Vec<Vec<Card>>,
}

pub async fn get_task(user: User) -> Json<Vec<FullMatch>> {
    if let Ok(history) = history_request(&user.puuid).await {
        if let Ok(matches) = all_matches_history_request(&history, 10).await {
            let mut ready_for_send_matches: Vec<FullMatch> = vec!();
                for game in matches {
                    let mut decks_code: Vec<String> = vec!();
                    let mut users_details: Vec<User> = vec!(user.clone()); 
                    for player in &game.info.players {
                        if &player.puuid != &user.puuid {
                            // Make a request.
                            match game_name_request(&player.puuid).await {
                                Ok(user_result) => users_details.push(user_result),
                                Err(err) => {
                                    // Handle the error, e.g., print it
                                    eprintln!("Error fetching user: {:?}", err);
                                }
                            }
                        }       
                        decks_code.push(player.deck_code.clone());
                    }

                    ready_for_send_matches.push(FullMatch {
                        metadata: game.clone(),
                        decoded_decks: translated_cards(decks_code),
                        users_information: users_details,
                    })
                }
               

            println!("cheushud");
            return Json(ready_for_send_matches);
        } else {
            eprintln!("Failed to retrieve all matches history");
        }
    } else {
        eprintln!("Failed to retrieve history");
    }

    // Return an empty JSON array in case of errors
    Json(vec![])
}

fn translated_cards(decks_code: Vec<String>) -> Vec<Vec<Card>> {
    if decks_code[0].len() == 0 {
        return vec![vec![Card::new()]];
    }
    decks_code
        .into_iter()
        .filter_map(|deck| {
            decoder::decode_base32(&deck).map(|mut decoded| {
                let _format = decoded[0] >> 4;
                let _version = decoded[0] & 0xF;
                decoded.remove(0);

                let processed_cards = decoder::process_deck(&mut decoded);
                get_translated_cards(processed_cards)
            })
        })
        .collect()
}
