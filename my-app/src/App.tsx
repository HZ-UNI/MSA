import axios from "axios";
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterInfo, setCharacterInfo] = useState<undefined | any>(undefined);
  const API_BASE_URL = "https://rickandmortyapi.com/api";

  return (
    <div>
      <h1>
        Character Search
      </h1>
      
      <div>
        <label>Enter the name of the Character</label><br/>
        <input 
          type="text" 
          id="character-name" 
          name="character-name" 
          onChange={(e) => setCharacterName(e.target.value)}/>
          <br/>

        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {characterName}</p>

      {characterInfo === undefined ? (
        <p>Character not found</p>
      ) : (
        <div id="result">
          <img src={characterInfo.results[1].image} />
        </div>
      )}
    </div>
  );

  function search(){
    axios
    .get(API_BASE_URL + "/character/?name=" + characterName)
    .then((res) => {
      setCharacterInfo(res.data);
    })
    .catch((err) => {
      console.log("Pokemon not found");
      setCharacterInfo(undefined);
    });
}
}

export default App;
