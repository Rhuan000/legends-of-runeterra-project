use serde::{Serialize, Deserialize};


#[derive(Debug, Clone, Default,Deserialize, Serialize)]
pub struct CardCodeAndCount {
    pub card_code: String,
    pub count: u32,
}