import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/userActions';
import PropTypes from 'prop-types';
import { Roles } from '../../systemdata/Role';

import './Register.css';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    IDCardNo: '',
    telno: '',
    gender: '',
    role: '',
  });
  const { email, password, fname, lname, IDCardNo, telno, gender, role } =
    formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    register({ email, password, fname, lname, IDCardNo, telno, gender, role });
    setAlert('You has been registered!', 'success');
  };

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-10 col-xl-9 mx-auto'>
          <div className='card flex-row border-0 shadow rounded-3 overflow-hidden mt-5'>
            <div className='card-img-left d-none d-md-flex' />
            <div
              className='card-body p-sm-5'
              style={{ backgroundColor: '#EAE7E2' }}
            >
              <h3 className='card-title text-center mb-3 text-uppercase'>
                Register with Adorminis
              </h3>
              <form onSubmit={onSubmit}>
                <div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-input mb-3'>
                        <input
                          type='email'
                          className='form-control border-0'
                          name='email'
                          value={email}
                          placeholder='อีเมล'
                          onChange={e => onChange(e)}
                          required
                        />
                      </div>
                      <div className='form-input mb-3'>
                        <input
                          type='text'
                          className='form-control border-0'
                          name='fname'
                          placeholder='ชื่อจริง'
                          onChange={e => onChange(e)}
                          value={fname}
                          required
                        />
                      </div>
                      <div className='form-input mb-3'>
                        <input
                          type='text'
                          className='form-control border-0 '
                          name='IDCardNo'
                          placeholder='เลขบัตรประชาชน'
                          onChange={e => onChange(e)}
                          value={IDCardNo}
                          required
                        />
                      </div>
                      <div className='form-input mb-2'>
                        <input
                          type='text'
                          className='form-control border-0'
                          placeholder='เบอร์โทรศัพท์'
                          name='telno'
                          onChange={e => onChange(e)}
                          value={telno}
                          required
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-input mb-3'>
                        <input
                          type='text'
                          className='form-control border-0'
                          name='password'
                          placeholder='รหัสผ่าน'
                          onChange={e => onChange(e)}
                          value={password}
                          required
                        />
                      </div>

                      <div className='form-input mb-3'>
                        <input
                          type='text'
                          className='form-control border-0'
                          name='lname'
                          placeholder='นามสกุล'
                          onChange={e => onChange(e)}
                          value={lname}
                          required
                        />
                      </div>
                      <div className='form-input mt-3'>
                        <select
                          className=' form-select border-0'
                          onChange={e => onChange(e)}
                          value={role}
                          name='role'
                        >
                          {Roles.map(role => {
                            return (
                              <option value={role.id}>{role.label}</option>
                            );
                          })}
                          {/* <option selected>ตำแหน่ง...</option>
                          <option value='user'>ผู้เช่า</option>
                          <option value='admin'>พนักงาน</option> */}
                        </select>
                      </div>
                      <div className='form-input mt-3'>
                        <select
                          className=' form-select border-0'
                          onChange={e => onChange(e)}
                          name='gender'
                          value={gender}
                          required
                        >
                          <option selected>เพศ...</option>
                          <option value='male'>ชาย</option>
                          <option value='female'>หญิง</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className='d-grid mb-2'>
                    <button
                      className='btn w-75 p-2 mx-auto mt-3'
                      type='submit'
                      value='Register'
                      style={{
                        color: '#000',
                        backgroundColor: '#C7E5F0',
                        boxShadow: '0px 4px 4px 0px #00000040',
                      }}
                    >
                      ลงทะเบียน<i className='fas fa-sign-in-alt'></i>
                    </button>
                  </div>
                  <Link to='/login' className='d-block text-center mt-2 small'>
                    มีบัญชีผู้ใช้อยู่แล้ว ? เข้าสู่ระบบ
                  </Link>

                  <hr className='my-4' />

                  <div className='d-grid mb-2'>
                    <button
                      className='btn btn-lg btn-google btn-login fw-bold'
                      type='submit'
                    >
                      <i className='fab fa-google me-2'></i> ดำเนินการต่อด้วย
                      Google
                    </button>
                  </div>

                  {/* <div className='d-grid'>
                    <button
                      className='btn btn-lg btn-facebook btn-login fw-bold'
                      type='submit'
                    >
                      <i className='fab fa-facebook-f me-2'></i>
                      ดำเนินการต่อด้วย Facebook
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
