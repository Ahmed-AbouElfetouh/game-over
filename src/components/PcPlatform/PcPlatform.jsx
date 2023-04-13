import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PcPlatform() {
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
      `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc`,
      options,
    );
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <Fragment>
      <div className="all-games">
        <div className="container">
          <div className="row">
            {data.map((data) => {
              return (
                <div className="col-md-3 mt-5" key={data.id}>
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
                        <h3 className="mb-0">
                          {data.title.split(' ').splice(0, 3).join(' ')}{' '}
                          {data.title.split(' ').length > 3 ? '...' : null}
                        </h3>
                        <span>Free</span>
                      </div>
                      <p>
                        {data.short_description
                          .split(' ')
                          .splice(0, 3)
                          .join(' ')}
                        {data.short_description.split(' ').length > 3
                          ? '...'
                          : null}
                      </p>
                      <div className="content-footer d-flex align-items-center justify-content-between p-3">
                        <i
                          className="fa-solid fa-square-plus"
                          style={{ color: '#aaaaaa' }}
                        ></i>
                        <div>
                          <span>{data.genre}</span>
                          <i
                            className="fa-brands fa-windows"
                            style={{ color: '#aaaaaa' }}
                          ></i>
                        </div>
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

export default PcPlatform;
