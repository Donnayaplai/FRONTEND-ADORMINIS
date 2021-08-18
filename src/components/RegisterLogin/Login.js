import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div
            className="card-body p-sm-5"
            style={{ backgroundColor: "#EAE7E2" }}
          >
            <h3 className="card-title text-center mb-3 text-uppercase fw-bold">
              Login with Adorminis
            </h3>
            <form>
              <div className="form-group mb-3">
                <input
                  className="form-control border-0 w-75 p-2 mx-auto"
                  type="email"
                  placeholder="อีเมล"
                  name="email"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control border-0 w-75 p-2 mx-auto"
                  type="password"
                  placeholder="รหัสผ่าน"
                  name="password"
                />
              </div>
              <div className="form-group">
                <Link to="/forgotpassword" className="btn btn-link pr-0">
                  ลืมรหัสผ่าน
                </Link>
              </div>

              <div className="d-grid">
                <button
                  className="btn w-50 p-2 mx-auto mt-3"
                  type="submit"
                  style={{
                    color: "#000",
                    backgroundColor: "#C7E5F0",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  }}
                >
                  เข้าสู่ระบบ <i className="fas fa-sign-in-alt"></i>
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  className="btn w-75 p-2 mx-auto"
                  type="submit"
                  style={{
                    color: "#fff",
                    backgroundColor: "#cd5642",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  }}
                >
                  <i className="fab fa-google me-2"></i>เข้าสู่ระบบด้วย Google
                </button>
              </div>
              <div className="d-grid">
                <button
                  className="btn w-75 p-2 mx-auto mt-3"
                  type="submit"
                  style={{
                    color: "#fff",
                    backgroundColor: "#415993",
                    boxShadow: "0px 4px 4px 0px #00000040",
                  }}
                >
                  <i className="fab fa-facebook-f me-2"></i> เข้าสู่ระบบด้วย
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
