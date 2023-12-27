use reqwest;
use crate::api::user_name_tag::User;
use serde_json;
use std::error::Error;
use std::env;

pub async fn game_name_request(user_puuid: &String) -> Result<User, Box<dyn Error>> {

    dotenv::dotenv().ok();
    let token = env::var("RIOT_API_TOKEN").expect("RIOT_API_TOKEN not set");

    let url = format!("https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/{}", user_puuid);
    let response = reqwest::Client::new()
        .get(&url)
        .header("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36")
        .header("Accept-Language", "en-US,en;q=0.9,pt;q=0.8")
        .header("Accept-Charset", " application/x-www-form-urlencoded; charset=UTF-8")
        .header("Origin", "https://developer.riotgames.com")
        .header("X-Riot-Token", &token)
        .send()
        .await?;

    println!("player_name_request");

    let res = response.text().await.map_err(|e| {
        println!("Error getting puuid: {:?}", e);
        Box::new(e) as Box<dyn Error>
    })?;
    let user: User = serde_json::from_str(&res).map_err(|e| {
        println!("Failed to deserialize JSON: {:?}", e);
        Box::new(e) as Box<dyn Error>
    })?;
    Ok(user)
}
