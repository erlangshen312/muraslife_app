import React, {useState, useEffect} from 'react';
import {getToken, setAuthData, getAuthData} from '../utils/asyncStorage';
import {apiUrl} from '../configs/config';
import axios from 'axios';
// import db from '../utils/db';

export default metro = () => {
  //   const db = new db();
  const [metroList, setMetroList] = useState({});

  getMetroData();
//   {
//     metroList.length <= 0 ? getMetroData() : getMetroDB();
//   }

//   const getMetroDB = async () => {
//     try {
//       const metroDB = await db.getMetro();
//       console.log('from metroDB : ', metroDB);
//       setMetroList(metroDB);
//     } catch (error) {
//       console.log(error);
//     }
  };
  const getMetroData = async () => {
    try {
      const res = await axios
        .get(apiUrl + '/api/metro')
        .then(setMetroList(res.data), () => {
          console.log('metro list is come');
        })
        .catch(() => {
          console.log('error in metro list');
        });
    } catch (error) {
      console.log('error in metro list', error);
    }
  };
};
