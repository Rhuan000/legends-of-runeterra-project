import { HomeFormBackground, HomeFormStyled, LoadSVG } from "./home-form.style";
import { HomeSelect } from "../home-select/home-select.component";
import { HomeButton } from "../home-button/home-button.component";
import { HomeInput } from "../home-input/home-input.component";
import { useContext, useState } from "react";
import { HistoryContext } from "../../contexts/history.context";

export function HomeForm() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("BR1");
  const [submitted, setSubmited] = useState(false);
  const historyContext = useContext(HistoryContext)

  function changeOnClick(){
    setSubmited(true)
  }

  function changeName(e){
    setName(e.target.value)
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    // Make a POST request to your Rust backend
    try {
        event.preventDefault()
        fetch("http://127.0.0.1:8000/user-game-tag", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          puuid: "",
          gameName: name,
          tagLine: tag,
        }),
      })
        .then(async (response) => {
          historyContext.setCurrentHistory(await response.json())
          setSubmited(false)
        });

    } catch (error) {
      console.error("Error during form submission:", error);
      setSubmited(false)
    }
  };

  return (
    <HomeFormBackground >
      <HomeFormStyled id="form" onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <HomeInput
            placeholder="Nome"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={changeName}
          />
          <HomeSelect onChange={(e) => setTag(e.target.value)} />
        </div>
        { submitted ? 
          <HomeButton type="submit" onClick={changeOnClick} disabled={submitted}>
            <LoadSVG/>
          </HomeButton> :
          <HomeButton type="submit" onClick={changeOnClick} disabled={submitted}>
           History
        </HomeButton>
        }
      </HomeFormStyled>
    </HomeFormBackground>
  );
}
