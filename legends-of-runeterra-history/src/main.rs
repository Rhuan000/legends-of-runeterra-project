use legends_of_runeterra_history::api::user_name_tag::user_name_tag;
use actix_web::{HttpServer, App, web};
use actix_cors::Cors;
  

#[actix_web::main]
async fn main() -> std::io::Result<()> {

        HttpServer::new(|| {
           App::new()
            .wrap(Cors::permissive())
            .app_data(web::JsonConfig::default().limit(4096)) 
            .service(user_name_tag)
        })
        .bind("127.0.0.1:8000")?
        .run()
        .await
}

