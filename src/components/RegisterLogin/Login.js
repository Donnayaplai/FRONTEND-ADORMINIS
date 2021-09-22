import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/userActions';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChangeInput = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
    console.log(formData);
  };

  //Redirect if logged in
  if (!isAuthenticated) {
    return <Redirect to='/profile' />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto mt-3'>
          <div className='card border-0 shadow rounded-3 my-3 '>
            <div
              className='card-body p-sm-5'
              style={{ backgroundColor: '#EAE7E2' }}
            >
              <h3 className='card-title text-center mb-3 text-uppercase fw-bold'>
                Login with Adorminis
              </h3>
              <form onSubmit={onSubmit}>
                <div className='form-group mb-3'>
                  <input
                    className='form-control border-0 w-75 p-2 mx-auto'
                    type='text'
                    placeholder='อีเมล'
                    name='email'
                    value={email}
                    onChange={e => onChangeInput(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control border-0 w-75 p-2 mx-auto'
                    type='password'
                    placeholder='รหัสผ่าน'
                    name='password'
                    value={password}
                    onChange={e => onChangeInput(e)}
                  />
                </div>
                <div className='form-group text-center mt-2'>
                  <Link to='/forgotpassword' className='fs-6'>
                    ลืมรหัสผ่าน
                  </Link>
                </div>

                <div className='d-grid mx-auto text-center'>
                  <button
                    className='btn w-50 p-2 mx-auto mt-3 '
                    type='submit'
                    value='Login'
                    style={{
                      color: '#000',
                      backgroundColor: '#C7E5F0',
                      boxShadow: '0px 4px 4px 0px #00000040',
                      maxWidth: '300px',
                      width: '100%',
                    }}
                  >
                    เข้าสู่ระบบ <i className='fas fa-sign-in-alt'></i>
                  </button>
                </div>
                <hr className='my-4' />
                <div
                  className='g-signin2 mx-auto'
                  data-onsuccess='onSignIn'
                ></div>
                {/* <div className='d-grid mb-2'>
                  <button
                    className='btn w-75 p-2 mx-auto'
                    type='submit'
                    style={{
                      color: '#fff',
                      backgroundColor: '#cd5642',
                      boxShadow: '0px 4px 4px 0px #00000040',
                    }}
                  >
                    <i className='fab fa-google me-2'></i>เข้าสู่ระบบด้วย Google
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
