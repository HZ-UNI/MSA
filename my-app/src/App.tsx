import axios from "axios";
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterInfo, setCharacterInfo] = useState<undefined | any>(undefined);
  const API_BASE_URL = "https://rickandmortyapi.com/api";

  return (
    <div>
      <div className="search-field">
        <h1>Rick and Morty character Search</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={characterName}
            onChange={(prop) => {
              setCharacterName(prop.target.value);
            }}
            label="Enter a character Name..."
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {characterInfo === undefined ? (
        <div></div>
      ) : (
        <div 
          id="result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper sx={{ backgroundColor: "white" }}>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {characterInfo === undefined || characterInfo === null ? (
                    <h1> Character not found</h1>
                  ) : (
                    <div>
                      <p>
                        Name: {characterInfo.results[0].name}
                        <br />
                        Species: {characterInfo.results[0].species}
                        <br />
                        Gender: {characterInfo.results[0].gender}
                        <br />
                        Origin: {characterInfo.results[0].origin.name}
                        <br />
                        Status: {characterInfo.results[0].status}
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {characterInfo?.results[0].image ? (
                    <img
                      height="300px"
                      width="300px"
                      alt={characterInfo.results[0].name}
                      src={characterInfo.results[0].image}
                    ></img>
                  ) : (
                    <Skeleton width={300} height={300} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  function search(){
    console.log(characterName);
    if (characterName === undefined || characterName === "") {
      return;
    }

    axios
      .get(API_BASE_URL + "/character/?name=" + characterName?.toLowerCase())
      .then((res) => {
        setCharacterInfo(res.data);
      })
      .catch(() => {
        console.log("Character not found");
        setCharacterInfo(null);
      });
  }
}

export default App;
