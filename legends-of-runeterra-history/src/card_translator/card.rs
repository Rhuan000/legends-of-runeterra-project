use serde::{Deserialize, Serialize};
use crate::deck_decoder::card_code_and_count::CardCodeAndCount;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Asset {
    
    #[serde(rename = "gameAbsolutePath")]
    pub game_absolute_path: String,
   
    #[serde(rename = "fullAbsolutePath")]
    pub full_absolute_path: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Card {
    pub name: String,
    pub rarity: String,
    pub cost: u32,
    pub attack: u32,
    pub health: u32,
    pub supertype: String,
    pub regions: Vec<String>,
    pub assets: Vec<Asset>,

    #[serde(rename = "cardCode")]
    pub card_code: String,

    #[serde(rename = "levelupDescriptionRaw")]
    pub level_up_description: String,

    #[serde(rename = "descriptionRaw")]
    pub description_raw: String,

    #[serde(rename = "type")]
    pub card_type: String,

    #[serde(skip_deserializing)]
    pub code_and_count: CardCodeAndCount,
    
    // Add other fields as needed
}

impl Card {
    pub fn new() -> Self {
        return Card {
            name: String::new(),
            rarity: String::new(),
            cost: 0,
            attack: 0,
            health: 0,
            supertype: String::new(),
            regions: vec![String::new()],
            assets: vec![Asset {
                    game_absolute_path: String::new(),    
                    full_absolute_path: String::new(), 
                }],
            level_up_description: String::new(),
            description_raw: String::new(),
            card_type: String::new(),
            code_and_count: CardCodeAndCount {
               card_code: String::new(),
               count: 0,
            },
            card_code: String::new(),
        };      
    }
}
