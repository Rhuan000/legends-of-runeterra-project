use actix_web::{post, web, HttpResponse};
use serde::{Deserialize, Serialize};
use crate::riot_api::puuid_request::{puuid_request};
use super::task::get_task;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct User {
    pub puuid: String,
    
    #[serde(rename = "tagLine")]
    pub tag_line: String,
    
    #[serde(rename = "gameName")]
    pub game_name: String,
}

#[post("/user-game-tag")]
pub async fn user_name_tag(request: web::Json<User>) -> HttpResponse {
    
    println!("requested");
    let data = request.into_inner();
    let name = data.game_name;
    let tag = data.tag_line;

    println!("Received POST request with name: {} and tag: {}", name, tag);

    // Call the injected function
    match puuid_request(User {
        puuid: String::new(),
        game_name: name,
        tag_line: tag,
    }).await {
        Ok(user) => HttpResponse::Ok().json(get_task(user).await),
        Err(err) => {
            println!("Error: {:?}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
