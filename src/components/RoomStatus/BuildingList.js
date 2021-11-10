import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import env from '../../env';
import axios from 'axios';
import building from '../../assets/images/building.jpg';

import './BuildingList.css';

const BuildingList = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    }
  });
  const [buildingList, setBuildingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBuildingList = async () => {
      try {
        const response = await axios.get(
          `${env.url}api/building/all/${props.dormId}`
        );
        setBuildingList(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(true);
    };

    getBuildingList();
  }, [props.dormId]);

  return (
    <>
      <Container>
        <h1>
          อาคารทั้งหมด &nbsp;<i className="fas fa-building"></i>
        </h1>
        <Row className="mt-3">
          {loading &&
            buildingList.map((list) => (
              <Col key={list.BUILDINGNAME}>
                <Card className="card-building" xs={12} sm={10} md={10}>
                  <Card.Img
                    src={building}
                    className="card-img"
                    alt="building"
                  />
                  <Card.Body>
                    <Card.Title>
                      <h5>
                        <span>ชื่ออาคาร: </span>
                        {list.BUILDINGNAME}
                      </h5>
                    </Card.Title>
                    <Card.Text>
                      <Link to={`/all-room/${list.BUILDINGID}`}>
                        <Button
                          id="building-info"
                          style={{ textDecoration: 'none' }}
                        >
                          ข้อมูลห้องทั้งหมด
                        </Button>
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      ;
    </>
    // <div className="container">
    //   <h1>
    //     อาคารทั้งหมด <i className="fas fa-building"></i>
    //   </h1>

    //   <div className="row">
    //     {loading &&
    //       dormList.map((list) => (
    //         <div
    //           className="col-sm-6 col-lg-6 col-xl-3 mt-3 mx-auto justify-conter-center"
    //           key={list.BUILDINGID}
    //         >
    //           <div className="card col-lg-4" style={{ width: '18rem' }}>
    //             <img
    //               src={building}
    //               className="card-img mx-auto"
    //               alt="buildings"
    //             />
    //             <div className="card-body">
    //               <h5 className="card-title text-center">
    //                 <span className="fw-bold">ชื่ออาคาร: </span>
    //                 {list.BUILDINGNAME}
    //               </h5>
    //             </div>
    //             <div className="card-body mx-auto">
    //               <Link
    //                 to={`/all-room/${list.BUILDINGID}`}
    //                 className="btn btn-lg"
    //                 style={{ backgroundColor: '#A4DBEA' }}
    //               >
    //                 ข้อมูลห้องทั้งหมด
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </div>
  );
};

export default BuildingList;
