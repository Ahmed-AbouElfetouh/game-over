import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './gameDetails.css';

function GameDetails() {
  const [data, setData] = useState({});
  let { id } = useParams();
  let myId = id;
  async function getData(myId) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bac7bc1881mshe55ab29b61d2f6bp10610ajsnd0f02d7526cc',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    };
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${myId}`,
      options,
    );
    setData(data);
    console.log(data)
  }
  useEffect(() => {
    getData(myId);
  }, [myId]);
  return (
    <div className="game-details">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="image">
              <img src={data.thumbnail} alt={data.title}></img>
            </div>
          </div>
          <div className="col-md-8">
            <div className='content'>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
