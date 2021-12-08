import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { RiFileInfoFill } from 'react-icons/ri';
// import { Provinces } from '../../systemdata/Provinces';

const Editdorm = (props) => {
  // const [dorm, setDorm] = useState([]);
  const [dormNameTH, setDormNameTH] = useState('');
  const [dormNameENG, setDormNameENG] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [province, setProvince] = useState('');
  const [postCode, setPostCode] = useState('');
  const [telNo, setTelNo] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      getDormitoryInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDormitoryInfo = async () => {
    try {
      setLoading(true);
      await axios.get(`${env.url}dorm/info/${props.dormId}`).then((data) => {
        setDormNameTH(data.data.DORMNAMETH);
        setDormNameENG(data.data.DORMNAMEENG);
        setAddress(data.data.ADDRESS);
        setProvince(data.data.PROVINCE);
        setStreet(data.data.STREET);
        setPostCode(data.data.POSTCODE);
        setTelNo(data.data.TELNO);
        setSubdistrict(data.data.SUBDISTRICT);
        setDistrict(data.data.DISTRICT);
      });
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  const EditDormData = async (e) => {
    try {
      await axios
        .post(`${env.url}dorm/update/${props.match.params.dormid}`, {
          dormNameTH: dormNameTH,
          dormNameENG: dormNameENG,
          address: address,
          province: province,
          street: street,
          postCode: postCode,
          telNo: telNo,
          subdistrict: subdistrict,
          district: district,
        })
        .then(window.alert('การแก้ไขข้อมูลหอพักเสร็จสิ้น'))
        .then(history.push(`/dorm-info`));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <Container>
      <h1>
        แก้ไขข้อมูลหอพัก <RiFileInfoFill />
      </h1>
      <Row>
        <center>
          {error && <h6 className="text-danger mb-3 mt-3">{error}</h6>}
        </center>
      </Row>

      <Container className="w-75 mb-5 mt-3">
        <Form onSubmit={EditDormData}>
          <Container
            className="p-3 rounded mb-3"
            style={{ backgroundColor: '#EAE7E2' }}
          >
            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (ไทย)</Form.Label>
                  <Form.Control
                    type="text"
                    value={dormNameTH}
                    name="dormNameTH"
                    onChange={(e) => {
                      setDormNameTH(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ชื่อหอพัก (อังกฤษ)</Form.Label>
                  <Form.Control
                    type="text"
                    name="dormNameENG"
                    value={dormNameENG}
                    onChange={(e) => {
                      setDormNameENG(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={4}>
                <Form.Group>
                  <Form.Label>เบอร์โทรศัพท์</Form.Label>
                  <Form.Control
                    type="text"
                    name="telNo"
                    value={telNo}
                    onChange={(e) => {
                      setTelNo(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={8}>
                <Form.Group>
                  <Form.Label>ที่อยู่</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>ถนน</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>แขวง/ตำบล</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="แขวง"
                    name="subdistrict"
                    value={subdistrict}
                    onChange={(e) => {
                      setSubdistrict(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>เขต/อำเภอ</Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>รหัสไปรษณีย์</Form.Label>
                  <Form.Control
                    type="text"
                    name="postCode"
                    value={postCode}
                    onChange={(e) => {
                      setPostCode(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* <Row className="mb-3">
              <Col xs={12} sm={12} md={6}>
                <Form.Group>
                  <Form.Label>จังหวัด</Form.Label>
                  <Form.Select name="province">
                    {Provinces.map((item) => {
                      return (
                        <option key={item.id} value={province}>
                          {item.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row> */}
          </Container>
          <Row>
            <Col>
              <Link to={`/dorm-info/${props.location.state.dormId}`}>
                <Button type="button" id="btn-cancel">
                  ย้อนกลับ
                </Button>
              </Link>
            </Col>
            <Col>
              <Button
                type="submit"
                style={{ float: 'right' }}
                id="btn-next"
                onClick={EditDormData}
              >
                ตกลง
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
};

export default withRouter(Editdorm);
