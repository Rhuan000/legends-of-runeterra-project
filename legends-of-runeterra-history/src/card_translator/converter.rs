use std::{fs::File, io::Read};
use super::card::Card;
use crate::deck_decoder::card_code_and_count::CardCodeAndCount;

///Look through the database for Card code, and return the Card informations.
pub fn get_translated_cards(cards_to_lookfor: Vec<CardCodeAndCount>) -> Vec<Card> {

    // Update the counts and create a new vector
    let filtered_cards: Vec<Card> = get_cards_database()
        .into_iter()
        .filter_map(|card| {
            cards_to_lookfor
                .iter()
                .find(|card_to_filter| card_to_filter.card_code == card.card_code)
                .map(|card_to_filter| {
                    let mut updated_card = card.clone();
                    updated_card.code_and_count = card_to_filter.clone();
                    updated_card
                })
        })
        .collect();

    filtered_cards
}

///Getting cards from local database and typing as a Card.
fn get_cards_database() -> Vec<Card> {
    //Putting the eight database in same Vector of Cards.
    let mut cards_database_cards: Vec<Card> = Vec::new();

    for file in 1..=8 {
        let file_path = format!("./data/set{}-en_us.json", file);
        // Open the file
        let mut cards_database = File::open(&file_path).expect(&format!("Failed to open file: {}", file_path));

        // Read the content of the file into a String
        let mut cards_database_string = String::new();
        cards_database.read_to_string(&mut cards_database_string)
            .expect(&format!("Failed to read file content: {}", file_path));

        // Deserialize the JSON content into your Rust data structure
        let cards_database_json: Vec<Card> = serde_json::from_str(&cards_database_string)
            .expect(&format!("Failed to deserialize JSON: {}", file_path));
        cards_database_cards.extend(cards_database_json);
    }
    cards_database_cards
}