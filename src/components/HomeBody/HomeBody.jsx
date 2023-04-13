import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeBody.css';

function HomeBody() {
  const [data, setData] = useState([]);

  async function getData() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bac7bc1881mshe55ab29b61d2f6bp10610ajsnd0f02d7526cc',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    };
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games`,
      options,
    );
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <div className="body">
        <div className="container">
          <h2 className="mt-5">
            <i className="fa-solid fa-robot" style={{ color: '#aaaaaa' }}></i>{' '}
            Personalized Recommendations
          </h2>
          <div className="row">
            {data.slice(0, 3).map((data) => {
              return (
                <div className="col-md-4 mt-5" key={data.id}>
                  <Link
                    to={`/gameDetails/${data.id}`}
                    className="text-decoration-none"
                  >
                    <div className="body-content">
                      <div className="image">
                        <img
                          src={data.thumbnail}
                          alt={data.title}
                          className="w-100"
                        ></img>
                      </div>
                      <div className="box d-flex align-items-center justify-content-between p-3">
                        <p>{data.title}</p>
                        <span>Free</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomeBody;
