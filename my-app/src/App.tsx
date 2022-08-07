import axios from "axios";
import { useState } from 'react';
import './App.css';

function App() {
  const [digimonName, setDigimonName] = useState("");
  const [digimonInfo, setDigimonInfo] = useState<undefined | any>(undefined);
  const DIGIMON_BASE_URL = "https://digimon-api.vercel.app/api/digimon";

  return (
    <div>
      <h1>
        Digimon Search
      </h1>
      
      <div>
        <label>Enter the name of the Digimon</label><br/>
        <input 
          type="text" 
          id="digimon-name" 
          name="digimon-name" 
          onChange={(e) => setDigimonName(e.target.value)}/>
          <br/>

        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {digimonName}</p>

      {digimonInfo === undefined ? (
        <p>Digimon not found</p>
      ) : (
        <div id="digimon-result">
          <img src={digimonInfo.img} />
        </div>
      )}
    </div>
  );

  function search(){
    axios.get(DIGIMON_BASE_URL + "/name/" + digimonName).then((res) => {
      setDigimonInfo(res.data);
    });
}
}

export default App;
