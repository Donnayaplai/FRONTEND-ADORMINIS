import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
// import UserProfile from '../../assets/images/profile-user.png';
function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState({
    startDate: '',
    endDate: '',
    checkinDate: '',
  });

  const { startDate, endDate, checkinDate } = additionalInfo;

  const onChange = (e) =>
    setAdditionalInfo({ ...additionalInfo, [e.target.name]: e.target.value });

  const onSubmitData = async (e) => {
    e.preventDefault();
    console.log(additionalInfo);
    axios.post(`${env.url}api/`);
  };

  let getUserProfile = async () => {
    // let res = await axios.get(`${env.url}`);
    // setUserInfo(res.data);
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let button = {
    backgroundColor: '#8be0f1',
    textAlign: 'center',
    color: 'black',
    fontSize: '1.125rem',
    height: '50px',
    maxHeight: '50px',
    width: '100%',
    maxWidth: '300px',
    marginTop: '3%',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
  };

  return (
    <div className="profile">
      <h1>
        ข้อมูลส่วนตัว<i className="fas fa-address-card ms-3"></i>
      </h1>
      <div
        className="col-10 p-3 mx-auto mb-5 w-50"
        style={{ backgroundColor: '#EAE7E2' }}
      >
        {/* <div
          style={{
            marginBottom: '5%',
          }}
        >
          <img
            src={UserProfile}
            alt="user-profile"
            style={{ maxWidth: '8rem' }}
          />
        </div> */}
        <h4 className="fw-bold text-center">ข้อมูลส่วนตัวผู้เช่า</h4>
        <div className="row mx-auto mb-3 mt-3">
          <div className="col-6">
            <label htmlFor="fname" className="form-label col-2">
              ชื่อ
            </label>
            <input type="text" className="form-control" required />
          </div>
          <div className="col-6">
            <label htmlFor="lname" className="form-label col-2">
              นามสกุล
            </label>
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="row mx-auto mb-3">
          <div className="col-6">
            <label htmlFor="telno" className="form-label col-sm-6">
              เบอร์โทร
            </label>
            <input type="text" className="form-control" required />
          </div>
          <div className="col-6">
            <label htmlFor="email" className="form-label col-3">
              อีเมล
            </label>
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col-6">
            <h6 className="me-3">เพศ: </h6>
            <div className="form-check form-check-inline me-4">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="femaleGender"
                value="option1"
              />
              <label className="form-check-label" htmlFor="femaleGender">
                หญิง
              </label>
            </div>

            <div className="form-check form-check-inline me-4">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="maleGender"
                value="option2"
              />
              <label className="form-check-label" htmlFor="maleGender">
                ชาย
              </label>
            </div>
          </div>

          <div className="col-6">
            <label htmlFor="IDCardNo" className="form-label col-sm-6 col-md-8">
              รหัสบัตรประชาชน
            </label>
            <input type="text" className="form-control" required />
          </div>
        </div>
        <hr />
        <form>
          <h4 className="fw-bold text-center">ข้อมูลเพิ่มเติม</h4>
          <div className="row mx-auto mb-3 mt-3">
            <div className="col-6">
              <label
                htmlFor="startdate"
                className="form-label col-md-6 col-sm-6"
              >
                วันเริ่มสัญญา
              </label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={startDate}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="enddate" className="form-label col-sm-6 col-md-8">
                วันสิ้นสุดสัญญา
              </label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={endDate}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row mx-auto mb-3 mt-3">
            <div className="col-6">
              <label htmlFor="startdate" className="form-label col-sm-6">
                วันที่เข้าพัก
              </label>
              <input
                type="date"
                className="form-control"
                name="checkinDate"
                value={checkinDate}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <button
            className="btn"
            style={button}
            type="submit"
            onClick={onSubmitData}
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
