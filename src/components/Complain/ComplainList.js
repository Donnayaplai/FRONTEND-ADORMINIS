import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Info from '../../assets/images/billinfo.png';
import './Complain.css';

const ComplainList = ({
  complainList,
  loading,
  filteredComplain,
  searchText,
  getAllComplain,
  ...props
}) => {
  const getComplainList = () => {
    if (searchText === '') {
      return complainList;
    } else {
      return filteredComplain;
    }
  };
  if (!loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      {getComplainList().length === 0 ? (
        <h3 className="text-danger fw-bold text-center mt-5">
          ไม่พบข้อมูลที่ค้นหา
        </h3>
      ) : (
        <Table
          responsive
          className="table table-hover table-borderless mt-3 mx-auto w-75"
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
            </tr>
          </thead>

          <tbody>
            {getComplainList().map((list, i) => (
              <tr
                key={list.i}
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
                    // to={`/complain-detail/${list.PROBLEMID}`}
                    to={{
                      pathname: `/complain-detail/${list.PROBLEMID}`,
                      state: { dormId: props.match.params.dormId },
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default withRouter(ComplainList);
