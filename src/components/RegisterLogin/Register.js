import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [IDCardNo, setIDCardNo] = useState("");
  const [telno, setTelNo] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  const onHandleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onHandlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onHandleFname = (e) => {
    const fname = e.target.value;
    setFname(fname);
  };
  const onHandleLname = (e) => {
    const lname = e.target.value;
    setLname(lname);
  };
  const onHandleIDCardNo = (e) => {
    const IDCardNo = e.target.value;
    setIDCardNo(IDCardNo);
  };
  const onHandleTelNo = (e) => {
    const telno = e.target.value;
    setTelNo(telno);
  };
  const onHandleGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };
  const onHandleRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };
  const onHandleRegister = (e) => {
    console.log(email);
    console.log(password);
    console.log(fname);
    console.log(lname);
    console.log(telno);
    console.log(IDCardNo);
    console.log(role);
    console.log(gender);
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row border-0 shadow rounded-3 overflow-hidden mt-3">
            <div className="card-img-left d-none d-md-flex" />
            <div
              className="card-body p-sm-5"
              style={{ backgroundColor: "#EAE7E2" }}
            >
              <h3 className="card-title text-center mb-3 text-uppercase">
                Register with Adorminis
              </h3>
              <form>
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-input mb-3">
                        <input
                          type="email"
                          className="form-control border-0"
                          name="email"
                          placeholder="อีเมล"
                          value={email}
                          onChange={onHandleEmail}
                          required
                        />
                      </div>
                      <div className="form-input mb-3">
                        <input
                          type="text"
                          className="form-control border-0"
                          name="fname"
                          placeholder="ชื่อจริง"
                          value={fname}
                          onChange={onHandleFname}
                          required
                        />
                      </div>
                      <div className="form-input mb-3">
                        <input
                          type="text"
                          className="form-control border-0 "
                          name="IDCardNo"
                          placeholder="เลขบัตรประชาชน"
                          value={IDCardNo}
                          onChange={onHandleIDCardNo}
                          required
                        />
                      </div>
                      <div className="form-input mb-2">
                        <input
                          type="text"
                          className="form-control border-0"
                          placeholder="เบอร์โทรศัพท์"
                          name="telno"
                          value={telno}
                          onChange={onHandleTelNo}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input mb-3">
                        <input
                          type="text"
                          className="form-control border-0"
                          name="password"
                          placeholder="รหัสผ่าน"
                          value={password}
                          onChange={onHandlePassword}
                          required
                        />
                      </div>

                      <div className="form-input mb-3">
                        <input
                          type="text"
                          className="form-control border-0"
                          name="lname"
                          placeholder="นามสกุล"
                          value={lname}
                          onChange={onHandleLname}
                          required
                        />
                      </div>
                      <div className="form-input mt-3">
                        <select
                          className=" form-select border-0"
                          required
                          value={role}
                          onChange={onHandleRole}
                        >
                          <option selected>ตำแหน่ง...</option>
                          <option value="user">ผู้เช่า</option>
                          <option value="admin">พนักงาน</option>
                        </select>
                      </div>
                      <div className="form-input mt-3">
                        <select
                          className=" form-select border-0"
                          value={gender}
                          onChange={onHandleGender}
                          required
                        >
                          <option selected>เพศ...</option>
                          <option value="male">ชาย</option>
                          <option value="female">หญิง</option>
                        </select>
                      </div>

                      {/* <div className="form-input mt-3">
                        <input
                          type="date"
                          className="form-control border-0"
                          name="dob"
                          placeholder="ว/ด/ป เกิด"
                          required
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className="d-grid mb-2">
                    <button
                      className="btn w-75 p-2 mx-auto mt-3"
                      type="submit"
                      onClick={onHandleRegister}
                      style={{
                        color: "#000",
                        backgroundColor: "#C7E5F0",
                        boxShadow: "0px 4px 4px 0px #00000040",
                      }}
                    >
                      ลงทะเบียน<i className="fas fa-sign-in-alt"></i>
                    </button>
                  </div>
                  <Link to="/login" className="d-block text-center mt-2 small">
                    มีบัญชีผู้ใช้อยู่แล้ว ? เข้าสู่ระบบ
                  </Link>

                  <hr className="my-4" />

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-google btn-login fw-bold"
                      type="submit"
                    >
                      <i className="fab fa-google me-2"></i> ดำเนินการต่อด้วย
                      Google
                    </button>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-lg btn-facebook btn-login fw-bold"
                      type="submit"
                    >
                      <i className="fab fa-facebook-f me-2"></i>
                      ดำเนินการต่อด้วย Facebook
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
