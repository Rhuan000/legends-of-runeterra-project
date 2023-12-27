use reqwest::Client;
use super::request_error::RequestError;
use reqwest::header::{HeaderMap, HeaderValue, ACCEPT_LANGUAGE, ACCEPT_CHARSET, USER_AGENT, ORIGIN};
use std::env;

pub async fn history_request(puuid: &str) -> Result<String, RequestError> {
    // Load environment variables from the .env file
    dotenv::dotenv().ok();

    let url = format!("https://americas.api.riotgames.com/lor/match/v1/matches/by-puuid/{}/ids", puuid);

    let client = Client::new();
    let mut headers = HeaderMap::new();

    headers.insert(USER_AGENT, HeaderValue::from_static("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"));
    headers.insert(ACCEPT_LANGUAGE, HeaderValue::from_static("en-US,en;q=0.9,pt;q=0.8"));
    headers.insert(ACCEPT_CHARSET, HeaderValue::from_static("application/x-www-form-urlencoded; charset=UTF-8"));
    headers.insert(ORIGIN, HeaderValue::from_static("https://developer.riotgames.com"));

    // Get the API token from the environment variable
    let token = env::var("RIOT_API_TOKEN").expect("RIOT_API_TOKEN not set");
    headers.insert("X-Riot-Token", HeaderValue::from_str(&token).expect("Invalid token format"));

    let response = client.get(&url)
        .headers(headers)
        .send()
        .await;

    match response {
        Ok(res) => {
            if res.status().is_success() {
                Ok(res.text().await?)
            } else {
                let status_code = res.status();
                Err(RequestError::HttpStatusError(status_code))
            }
        }
        Err(err) => {
            Err(RequestError::ReqwestError(err))
        },
    }
}
