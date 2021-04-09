import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux'

export const LandingPage = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3030/api/plants');
      setData(result.data);
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    data && (
      <>
        hi
        <div key={nanoid()}>
          {data.map((plant) => (
            <div key={nanoid()}>{plant.plantName}</div>
          ))}
        </div>
      </>
    )
  );
};
