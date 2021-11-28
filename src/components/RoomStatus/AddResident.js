import axios from 'axios';
import env from '../../env';
import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const AddResident = (props) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [isRoomAvailable, setRoomAvailable] = useState([]);
  const [costList] = useState([
    {
      id: 4,
      costName: 'ส่วนกลาง',
    },

    {
      id: 5,
      costName: 'ที่จอดรถ',
    },
    {
      id: 6,
      costName: 'อินเทอร์เน็ต',
    },
    {
      id: 7,
      costName: 'รักษาความสะอาด',
    },
    {
      id: 8,
      costName: 'อื่น ๆ',
    },
  ]);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login');
    } else {
      CheckRoomStatus();
      setFormData(new FormData());
    }
    //eslint-disable-next-line
  }, []);

  const onSubmit = async (data) => {
    try {
      data.listOfCost = checked;
      await axios
        .post(
          `${env.url}api/room/add/${props.match.params.buildingid}/${props.match.params.roomid}`,
          data
        )
        .then(window.alert('เพิ่มผู้เช่าเสร็จสิ้น'))
        .then(history.push(`/all-room/${props.location.state.buildingId}`));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        window.alert(error);
      }
    }
  };

  const handleToggle = (c) => () => {
    const clickedCostList = checked.indexOf(c);
    const all = [...checked];

    if (clickedCostList === -1) {
      all.push(c);
    } else {
      all.splice(clickedCostList, 1);
    }
    setChecked(all);
    formData.set('costList', all);
  };

  //เช็คสถานะห้องพักก่อนเพิ่มผู้เช่าเข้าห้อง
  const CheckRoomStatus = async () => {
    try {
      const response = await axios.get(
        `${env.url}api/room/status/${props.match.params.roomid}`
      );
      setRoomAvailable(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <>
      <h1>
        เพิ่มผู้เช่า <i className="fas fa-user-plus"></i>
      </h1>
      <Container className="mb-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container style={{ maxWidth: '800px' }}>
            <h4 className="fw-bold">ข้อมูลส่วนตัว</h4>
            <Container
              className="py-4 rounded mb-3"
              style={{ backgroundColor: '#EAE7E2' }}
            >
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>ชื่อ</Form.Label>
                    <Form.Control
                      name="fName"
                      type="text"
                      placeholder="สมศรี"
                      {...register('fName', { required: 'โปรดกรอกชื่อจริง' })}
                      onKeyUp={() => {
                        trigger('fName');
                      }}
                    />
                    {errors.fName && (
                      <small className="text-danger">
                        {errors.fName.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>นามสกุล</Form.Label>
                    <Form.Control
                      name="lName"
                      type="text"
                      placeholder="โชคดี"
                      {...register('lName', { required: 'โปรดกรอกนามสกุล' })}
                      onKeyUp={() => {
                        trigger('lName');
                      }}
                    />
                    {errors.lName && (
                      <small className="text-danger">
                        {errors.lName.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันเกิด</Form.Label>
                    <Form.Control
                      name="dateOfBirth"
                      type="date"
                      {...register('dateOfBirth', {
                        required: 'โปรดกรอกวัน/เดือน/ปี เกิด',
                      })}
                      onKeyUp={() => {
                        trigger('dateOfBirth');
                      }}
                    />
                    {errors.dateOfBirth && (
                      <small className="text-danger">
                        {errors.dateOfBirth.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>รหัสบัตรประชาชน</Form.Label>
                    <Form.Control
                      name="idCardNo"
                      type="text"
                      placeholder="รหัสบัตรประชาชน 13 หลัก"
                      className={`form-control ${errors.idCardNo && 'invalid'}`}
                      {...register('idCardNo', {
                        required: 'โปรดกรอกรหัสบัตรประชาชน',
                        minLength: {
                          value: 13,
                          message: 'รหัสบัตรประชาชนควรมี 13 หลัก',
                        },
                        maxLength: {
                          value: 13,
                          message: 'รหัสบัตรประชาชนควรมี 13 หลัก',
                        },
                      })}
                      onKeyUp={() => {
                        trigger('idCardNo');
                      }}
                    />
                    {errors.idCardNo && (
                      <small className="text-danger">
                        {errors.idCardNo.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>เบอร์โทรศัพท์</Form.Label>
                    <Form.Control
                      name="telNo"
                      type="text"
                      placeholder="0xxxxxxxxx"
                      className={`form-control ${errors.telNo && 'invalid'}`}
                      {...register('telNo', {
                        required: 'โปรดกรอกเบอร์โทรศัพท์',
                        pattern: {
                          value:
                            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                          message: 'โปรดกรอกเบอร์โทรศัพท์ให้ถูกต้อง',
                        },
                      })}
                      onKeyUp={() => {
                        trigger('telNo');
                      }}
                    />
                    {errors.telNo && (
                      <small className="text-danger">
                        {errors.telNo.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>เพศ</Form.Label>
                    <Form.Select
                      name="gender"
                      {...register('gender', {
                        required: 'โปรดกรอกเพศ',
                      })}
                      onKeyUp={() => {
                        trigger('gender');
                      }}
                    >
                      <option defaultValue>เลือกเพศ...</option>
                      <option value="หญิง">หญิง</option>
                      <option value="ชาย">ชาย</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>ที่อยู่</Form.Label>
                    <Form.Control
                      style={{ maxWidth: '800px', padding: '30px' }}
                      name="address"
                      type="text"
                      placeholder="126/54 ซอยบางบอน 5 ซอย 7 ถนนบางบอน 3 แขวงบางบอน​ เขต​บางบอน​ กรุงเทพ​มหานคร​ 10150"
                      {...register('address', {
                        required: 'โปรดกรอกที่อยู่ปัจจุบัน',
                      })}
                      onKeyUp={() => {
                        trigger('address');
                      }}
                    />
                    {errors.address && (
                      <small className="text-danger">
                        {errors.address.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Container>

          <Container style={{ maxWidth: '800px' }} className="mt-3">
            <h4 className="fw-bold">ข้อมูลการเช่าพัก</h4>

            <Container
              className="py-4 rounded mb-3"
              style={{ backgroundColor: '#EAE7E2' }}
            >
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันเริ่มสัญญา</Form.Label>
                    <Form.Control
                      name="startDate"
                      type="date"
                      {...register('startDate', {
                        required: 'โปรดกรอกวันเริ่มสัญญา',
                      })}
                      onKeyUp={() => {
                        trigger('startDate');
                      }}
                    />
                    {errors.startDate && (
                      <small className="text-danger">
                        {errors.startDate.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันสิ้นสุดสัญญา</Form.Label>
                    <Form.Control
                      name="endDate"
                      type="date"
                      {...register('endDate', {
                        required: 'โปรดกรอกวันสิ้นสุดสัญญา',
                      })}
                      onKeyUp={() => {
                        trigger('endDate');
                      }}
                    />
                    {errors.endDate && (
                      <small className="text-danger">
                        {errors.endDate.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>วันที่เริ่มเข้าพัก</Form.Label>
                    <Form.Control
                      name="checkInDate"
                      type="date"
                      {...register('checkInDate', {
                        required: 'โปรดกรอกวันที่เริ่มเข้าพัก',
                      })}
                      onKeyUp={() => {
                        trigger('checkInDate');
                      }}
                    />
                    {errors.checkInDate && (
                      <small className="text-danger">
                        {errors.checkInDate.message}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Container>

          <Container style={{ maxWidth: '800px' }} className="mt-3">
            <h4 className="fw-bold">ค่าใช้จ่ายเพิ่มเติม</h4>
            {isRoomAvailable.status === false ? (
              <Container
                className="py-4 rounded mb-3"
                style={{ backgroundColor: '#EAE7E2' }}
              >
                {costList.map((c) => {
                  return (
                    <Row key={c.id}>
                      <Col>
                        <input
                          type="checkbox"
                          onChange={handleToggle(c.id)}
                          id="checkbox"
                          disabled
                        />
                        <label>{c.costName}</label>
                      </Col>
                    </Row>
                  );
                })}
              </Container>
            ) : (
              <Container
                className="py-4 rounded mb-3"
                style={{ backgroundColor: '#EAE7E2' }}
              >
                {costList.map((c) => {
                  return (
                    <Row key={c.id}>
                      <Col>
                        <input
                          type="checkbox"
                          onChange={handleToggle(c.id)}
                          id="checkbox"
                        />
                        <label>{c.costName}</label>
                      </Col>
                    </Row>
                  );
                })}
              </Container>
            )}

            <Row className="mt-3">
              <Col>
                <Link to={`/all-room/${props.location.state.buildingId}`}>
                  {/* //ส่ง state ไปกับ link */}
                  {/* {console.log(props.location.state)} */}
                  <Button id="btn-cancel" style={{ float: 'left' }}>
                    ย้อนกลับ
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button id="btn-next" type="submit" style={{ float: 'right' }}>
                  ตกลง
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default withRouter(AddResident);
