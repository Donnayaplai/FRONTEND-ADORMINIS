import React, { useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Delete from '../../assets/images/delete.png';
import axios from 'axios';
import env from '../../env';
const ResidentComplainList = ({
  complainList,
  loading,
  filteredComplain,
  searchText,
  getAllResidentProblems,
  ...props
}) => {
  const [problemID, setSelectProblemId] = useState();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [error, setError] = useState(null);

  const getResidentComplainList = () => {
    if (searchText === '') {
      return complainList;
    } else {
      return filteredComplain;
    }
  };

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }

  let deleteComplain = () => {
    try {
      axios
        .delete(`${env.url}complaint/remove/${problemID}`)
        .then(window.alert('ปัญหาที่ร้องเรียนถูกลบแล้ว'))
        .then(setShowConfirmDeleteModal(false))
        .then(() => {
          getAllResidentProblems();
        });
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };

  const Cancle = async () => {
    setShowConfirmDeleteModal(false);
    setSelectProblemId('');
  };

  {
    error && window.alert(error);
  }

  return (
    <>
      {getResidentComplainList().length === 0 ? (
        <h3 className="text-dark fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
        <Table
          responsive
          className="table table-hover table-borderless mx-auto"
        >
          <thead
            style={{
              backgroundColor: '#C7E5F0',
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
              border: 'none',
            }}
          >
            <tr>
              <th>วันที่แจ้งเรื่อง</th>

              <th>ชื่อเรื่อง</th>
              <th>สถานะ</th>
              <th>รายละเอียด</th>
              <th>ยกเลิก</th>
            </tr>
          </thead>

          <tbody>
            {getResidentComplainList().map((list, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: '#EAE7E2',
                  border: 'none',
                  textAlign: 'center',
                }}
              >
                <td>{list.INFORMEDDATE}</td>
                <td>{list.TITLE}</td>
                <td>
                  {list.STATUS === 1 ? (
                    <Button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: '#32CD32',
                        color: '#fff',
                        fontSize: '1rem',
                        maxWidth: '10em',
                        width: '100%',
                        height: 'auto',
                        margin: '0.5em',
                        padding: '5px',
                        border: 'none',
                      }}
                      disabled
                    >
                      ดำเนินการเสร็จสิ้น
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: '#FF0000',
                        color: '#fff',
                        fontSize: '1rem',
                        maxWidth: '10em',
                        width: '100%',
                        height: 'auto',
                        margin: '0.5em',
                        padding: 'auto',
                        border: 'none',
                      }}
                      disabled
                    >
                      รอดำเนินการ
                    </Button>
                  )}
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/resident/complain-detail/${list.PROBLEMID}`,
                      state: { rentId: props.match.params.rentId },
                    }}
                  >
                    <Button
                      type="button"
                      className="btn"
                      onClick={() => {}}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      <i className="fas fa-info-circle text-dark fs-3"></i>
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    type="button"
                    className="btn"
                    onClick={() => {
                      // console.log(list.PROBLEMID);
                      setShowConfirmDeleteModal(true);
                      setSelectProblemId(list.PROBLEMID);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    <img
                      src={Delete}
                      alt="Delete Detail"
                      style={{ maxWidth: '1.5em' }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal show={showConfirmDeleteModal} onHide={Cancle}>
            <Modal.Header closeButton onClick={Cancle}>
              <Modal.Title>ยืนยันการลบข้อมูล</Modal.Title>
            </Modal.Header>
            <Modal.Body>คุณต้องลบการแจ้งปัญหาดังกล่าวใช่หรือไม่</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={Cancle}>
                ยกเลิก
              </Button>
              <Button variant="primary" onClick={() => deleteComplain()}>
                ตกลง
              </Button>
            </Modal.Footer>
          </Modal>
        </Table>
      )}
    </>
  );
};

export default withRouter(ResidentComplainList);
