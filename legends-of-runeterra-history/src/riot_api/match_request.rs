use serde_json::Value;
use serde::{Serialize, Deserialize};
use reqwest;
use reqwest::Error as ReqwestError; 
use std::env;

#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct Player {
    pub deck_code: String,
    pub deck_id: String,
    pub factions: Vec<String>,
    pub game_outcome: String,
    pub order_of_play: u32,
    pub puuid: String,
}

#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct GameInfo {
    pub game_mode: String,
    pub game_start_time_utc: String,
    pub game_type: String,
    pub game_version: String,
    pub players: Vec<Player>,
    pub total_turn_count: u32,
}

#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct Metadata {
    pub data_version: String,
    pub match_id: String,
    pub participants: Vec<String>,
}

#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct MatchResponse {
    pub info: GameInfo,
    pub metadata: Metadata
    // Add other fields from the Metadata object if needed
}


pub async fn single_match_request(id: &str) -> Result<String, ReqwestError> {
    dotenv::dotenv().ok();
    let token = env::var("RIOT_API_TOKEN").expect("RIOT_API_TOKEN not set");

    let url = format!("https://americas.api.riotgames.com/lor/match/v1/matches/{}", id);
    let response = reqwest::Client::new()
        .get(&url)
        .header("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36")
        .header("Accept-Language", "en-US,en;q=0.9,pt;q=0.8")
        .header("Accept-Charset", "application/x-www-form-urlencoded; charset=UTF-8")
        .header("Origin", "https://developer.riotgames.com")
        .header("X-Riot-Token", &token)
        .send()
        .await?;

    println!("single_match_request");
    Ok(response.text().await?)
}

pub async fn all_matches_history_request(json_matches: &str, amount: u8) -> Result<Vec<MatchResponse>, ReqwestError>  {
    println!("all_history_started");
    let mut history_json: Vec<MatchResponse> = Vec::new();
    if let Ok(json_value) = serde_json::from_str::<Value>(json_matches) {
        
      // Sleep duration in seconds

        if let Some(json_array) = json_value.as_array() {
            for match_id in json_array.iter().take(amount as usize) {
                if let Some(match_id_str) = match_id.as_str() {
                    match single_match_request(match_id_str).await {
                        Ok(res) => {
                            let metadata: MatchResponse = serde_json::from_str::<MatchResponse>(&res)
                                .unwrap_or_else(|e| panic!("Failed to deserialize JSON: {:?}", e));

                            history_json.push(metadata);
                        }
                        Err(err) => return Err(err),
                    };
                }
            }
        }
    }
    
    Ok(history_json)
}