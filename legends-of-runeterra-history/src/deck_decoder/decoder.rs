use base32;
use super::card_code_and_count::CardCodeAndCount;

pub fn decode_base32(encoded_deck: &str) -> Option<Vec<u8>> {
    base32::decode(base32::Alphabet::RFC4648 { padding: false }, encoded_deck)
}

pub fn process_deck(decoded_deck: &mut Vec<u8>) -> Vec<CardCodeAndCount> {
    let mut result = Vec::new();
    for i in (1..=3).rev() {
        if let Some(num_group_ofs) = pop_varint(decoded_deck) {
            for _j in 0..num_group_ofs {
                if let Some(num_ofs_in_this_group) = pop_varint(decoded_deck) {
                    let set = pop_varint(decoded_deck).unwrap();
                    let faction = pop_varint(decoded_deck).unwrap();

                    for _k in 0..num_ofs_in_this_group {
                        let card = pop_varint(decoded_deck).unwrap();

                        let set_string = format!("{:02}", set);
                        let faction_string = faction_number_to_string(faction);
                        let card_string = format!("{:03}", card);

                        let new_entry = CardCodeAndCount {
                            card_code: set_string + faction_string + &card_string,
                            count: i,
                        };
                        result.push(new_entry);
                    }
                }
            }
        }
    }

    result
}

fn pop_varint(bytes: &mut Vec<u8>) -> Option<i32> {
    let mut result = 0;
    let mut current_shift = 0;
    let mut bytes_popped = 0;

    for &byte_val in bytes.iter() {
        bytes_popped += 1;
        let current = (byte_val as u64 & 0x7f) << current_shift;
        result |= current;

        if byte_val & 0x80 != 0x80 {
            bytes.drain(0..bytes_popped);
            return Some(result as i32);
        }

        current_shift += 7;
    }

    None
}
pub fn faction_number_to_string(faction: i32) -> &'static str {
    match faction {
        0 => "DE",
        1 => "FR",
        2 => "IO",
        3 => "NX",
        4 => "PZ",
        5 => "SI",
        6 => "BW",
        7 => "SH",
        9 => "MT",
        10 => "BC",
        12 => "RU",
        _ => "Unknown",
    }
}

