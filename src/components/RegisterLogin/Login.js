import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const onChangeInput = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  let button = {
    backgroundColor: '#8be0f1',
    textAlign: 'center',
    color: 'black',
    fontSize: '1.125rem',
    height: '50px',
    maxHeight: '50px',
    width: '100%',
    maxWidth: '300px',
    float: 'right',
    marginTop: '2rem',
  };
  let loginGGButton = {
    color: '#fff',
    backgroundColor: '#cd5642',
    boxShadow: '0px 4px 4px 0px #00000040',
    width: '100%',
    maxWidth: '300px',
  };

  //Redirect if logged in
  // if (!isAuthenticated) {
  //   return <Redirect to="/profile" />;
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mt-3">
          <div className="card border-0 shadow rounded-3 my-3 ">
            <div
              className="card-body p-sm-5"
              style={{ backgroundColor: '#EAE7E2' }}
            >
              <h3 className="card-title text-center mb-5 text-uppercase fw-bold">
                Login with Adorminis
              </h3>
              {/* <form onSubmit={onSubmit}> */}
              <form>
                <div className="form-group mb-3">
                  <input
                    className="form-control border-0 p-2 mx-auto"
                    type="text"
                    placeholder="อีเมล"
                    name="email"
                    value={email}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control border-0 p-2 mx-auto"
                    type="password"
                    placeholder="รหัสผ่าน"
                    name="password"
                    value={password}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>
                <div className="form-group text-center mt-2">
                  <Link to="/forgotpassword" className="fs-6">
                    ลืมรหัสผ่าน
                  </Link>
                </div>

                <div className="d-grid mx-auto text-center">
                  <button
                    className="btn p-2 mt-3 mb-3 "
                    type="submit"
                    onClick={onSubmit}
                    style={button}
                  >
                    เข้าสู่ระบบ <i className="fas fa-sign-in-alt"></i>
                  </button>
                </div>
                <hr className="mb-3" />

                <div className="d-grid">
                  <button
                    className="btn p-2 mx-auto"
                    type="submit"
                    style={loginGGButton}
                  >
                    <i className="fab fa-google me-2"></i>เข้าสู่ระบบด้วย Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });
// export default connect(mapStateToProps, { login })(Login);
