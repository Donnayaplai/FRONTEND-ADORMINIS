import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import building from '../../assets/images/building.jpg';
import env from '../../env';

const BuildingList = (props) => {
  const { dormid } = useParams();

  const [dormList, setDormList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${env.url}api/building/all/${dormid}`) //ส่ง dormid ที่ได้จาก userdetail /App มา
      .then((res) => {
        console.log(res.data);
        setDormList(res.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>
        อาคารทั้งหมด <i className="fas fa-building"></i>
      </h1>
      <div className="row">
        {loading &&
          dormList.map((list) => (
            <div
              className="col-sm-6 col-lg-6 col-xl-3 mt-3 mx-auto justify-conter-center"
              key={list.BUILDINGID}
            >
              <div className="card col-lg-4" style={{ width: '18rem' }}>
                <img
                  src={building}
                  className="card-img mx-auto"
                  alt="buildings"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    <span className="fw-bold">ชื่ออาคาร: </span>
                    {list.BUILDINGNAME}
                  </h5>
                </div>
                <div className="card-body mx-auto">
                  <Link
                    to={`/all-room/${list.BUILDINGID}`}
                    className="btn btn-lg"
                    style={{ backgroundColor: '#A4DBEA' }}
                  >
                    ข้อมูลห้องทั้งหมด
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuildingList;
