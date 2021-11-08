import React, { useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Info from '../../assets/images/billinfo.png';
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
      // console.log(problemID);
      axios
        .delete(`${env.url}complaint/remove/${problemID}`)
        .then(window.alert('ปัญหาที่ร้องเรียนถูกลบแล้ว'))
        .then(window.location.reload())
        .then(() => {
          getAllResidentProblems();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const Cancle = async () => {
    setShowConfirmDeleteModal(false);
    setSelectProblemId('');
  };

  return (
    <>
      {getResidentComplainList().length === 0 ? (
        <h3 className="text-danger fw-bold text-center mt-5">ไม่พบข้อมูล</h3>
      ) : (
        <>
          <Table
            responsive
            className="table table-hover table-borderless mt-3 mx-auto"
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
                <th>ห้อง</th>
                <th>ชื่อเรื่อง</th>
                <th>สถานะ</th>
                <th>รายละเอียด</th>
                <th></th>
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
                  <td>{list.ROOMNO}</td>
                  <td>{list.TITLE}</td>
                  <td>
                    {list.STATUS === 1 ? (
                      <Button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: '#32CD32',
                          color: '#fff',
                          maxWidth: 'max-content',
                          width: '100%',
                          height: '30px',
                          margin: '10px',
                          padding: '3px',
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
                          maxWidth: 'max-content',
                          width: '100%',
                          height: '30px',
                          margin: '10px',
                          padding: '5px',
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
                        <img
                          src={Info}
                          alt="Complain Detail"
                          style={{ maxWidth: '2em' }}
                        />
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
                        style={{ maxWidth: '2em' }}
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
                  ยืนยัน
                </Button>
              </Modal.Footer>
            </Modal>
          </Table>
        </>
      )}
    </>
  );
};

export default withRouter(ResidentComplainList);
