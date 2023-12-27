use reqwest;
use std::fmt;
use reqwest::StatusCode;

#[derive(Debug)]
pub enum RequestError {
    HttpStatusError(StatusCode),
    ReqwestError(reqwest::Error),
}

impl fmt::Display for RequestError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            RequestError::HttpStatusError(status) => write!(f, "HTTP request failed with status code: {}", status),
            RequestError::ReqwestError(err) => write!(f, "Reqwest error: {}", err),
        }
    }
}
impl From<reqwest::Error> for RequestError {
    fn from(err: reqwest::Error) -> Self {
        RequestError::ReqwestError(err)
    }
}

impl std::error::Error for RequestError {}
