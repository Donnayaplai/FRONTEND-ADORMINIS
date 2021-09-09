import React, { useState } from 'react';
import { Provinces } from '../../systemdata/Provinces';
function DormSetting() {
  const [dormData, setDormData] = useState({
    dormnameth: '',
    dormnameeng: '',
    address: '',
    street: '',
    district: '',
    subdistrict: '',
    postcode: '',
    province: '',
    waterprice: '',
    minwaterunit: '',
    electricityprice: '',
    buildingname: '',
    numoffloor: '',
    roomtype: '',
    roomprice: '',
  });
  const {
    dormnameth,
    dormnameeng,
    address,
    street,
    district,
    subdistrict,
    postcode,
    province,
    waterprice,
    minwaterunit,
    electricityprice,
    buildingname,
    numoffloor,
    roomtype,
    roomprice,
  } = dormData;
  const onChange = e =>
    setDormData({ ...dormData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(dormData);
  };
  return (
    <div>
      <h1 className='text-center mt-3'>ตั้งค่าหอพัก</h1>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <div
            className='card mx-auto'
            style={{ maxWidth: '1200px', width: '90%' }}
          >
            <div className='card-header'>
              <p className='h5 fw-bold'>ตั้งค่าที่อยู่</p>
            </div>
            <div className='card-body' style={{ backgroundColor: '#EAE7E2' }}>
              <div className='form-group row align-items-center mb-3'>
                <label
                  for='dormnameth'
                  className='col-sm-2 col-md-2 col-form-label'
                >
                  ชื่อหอพัก (TH)
                </label>
                <div className='col-sm-10 col-md-10'>
                  <input
                    type='text'
                    className='form-control'
                    name='dormnameth'
                    id='dormnameth'
                    placeholder='ตัวอย่าง: หอพัก อดอมินิส'
                    value={dormnameth}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
              </div>

              <div className='form-group row align-items-center mb-3'>
                <label for='dormnameeng' className='col-sm-2 col-form-label'>
                  ชื่อหอพัก (ENG)
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    name='dormnameeng'
                    id='dormnameeng'
                    placeholder='ตัวอย่าง: Adorminis Place'
                    value={dormnameeng}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
              </div>

              <div className='form-group row align-items-center mb-3'>
                <label for='address' className='col-sm-2 col-form-label'>
                  ที่อยู่
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    name='address'
                    id='address'
                    placeholder='บ้านเลขที่/หมู่ที่/ซอย'
                    value={address}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
              </div>

              <div className='form-group row align-items-center'>
                <div className='col-md-6'>
                  <label for='street' className='col-sm-2 col-form-label'>
                    ถนน
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='street'
                    id='street'
                    value={street}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <label for='district' className='col-sm-3 col-form-label'>
                    แขวง
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='district'
                    id='district'
                    value={district}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
              </div>
              <div className='form-group row align-items-center'>
                <div className='col-md-6'>
                  <label for='subdistrict' className='col-sm-2 col-form-label'>
                    เขต
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='subdistrict'
                    id='subdistrict'
                    value={subdistrict}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <label for='postcode' className='col-sm-3 col-form-label'>
                    รหัสไปรษณีย์
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='postcode'
                    id='postcode'
                    value={postcode}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className='col-md-4'>
                  <label for='province' className='col-sm-3 col-form-label'>
                    จังหวัด
                  </label>
                  <select
                    className='form-select'
                    name='province'
                    id='province'
                    value={province}
                    onChange={e => onChange(e)}
                    required
                  >
                    {Provinces.map(item => {
                      return <option value={item.id}>{item.label}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div
            className='card mx-auto mt-5'
            style={{ maxWidth: '1200px', width: '90%' }}
          >
            <div className='card-header'>
              <p className='h5 fw-bold'>ตั้งค่าตึก</p>
            </div>
            <div className='card-body' style={{ backgroundColor: '#EAE7E2' }}>
              <div className='row'>
                <div className='col'>
                  <div className='form-group row align-items-center'>
                    <label
                      for='buildingname'
                      className='col-sm-3 col-md-2 col-form-label'
                    >
                      ชื่อตึก
                    </label>
                    <div className='col-sm-9 col-md-10'>
                      <input
                        type='text'
                        className='form-control'
                        name='buildingname'
                        id='buildingname'
                        value={buildingname}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-group row align-items-center'>
                    <label
                      for='numoffloor'
                      className='col-sm-3 col-md-3 col-form-label'
                    >
                      จำนวนชั้น
                    </label>
                    <div className='col-sm-9 col-md-6'>
                      <input
                        type='number'
                        className='form-control'
                        name='numoffloor'
                        id='numoffloor'
                        value={numoffloor}
                        min='1'
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className='card mx-auto mt-5'
            style={{ maxWidth: '1200px', width: '90%' }}
          >
            <div className='card-header'>
              <p className='h5 fw-bold'>ตั้งค่าห้องพัก</p>
            </div>
            <div className='card-body' style={{ backgroundColor: '#EAE7E2' }}>
              <div className='row'>
                <div className='col'>
                  <div className='form-group row align-items-center'>
                    <label
                      for='roomtype'
                      className='col-sm-3 col-md-3 col-form-label'
                    >
                      ประเภทห้อง
                    </label>
                    <div className='col-sm-9 col-md-9'>
                      <input
                        type='text'
                        className='form-control'
                        name='roomtype'
                        id='buildingname'
                        value={roomtype}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-group row align-items-center'>
                    <label
                      for='roomprice'
                      className='col-sm-3 col-md-2 col-form-label'
                    >
                      ราคา
                    </label>
                    <div className='col-sm-9 col-md-10'>
                      <input
                        type='text'
                        className='form-control'
                        name='roomprice'
                        id='roomprice'
                        value={roomprice}
                        min='1'
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className='card mx-auto mt-5 mb-3'
            style={{ maxWidth: '1200px', width: '90%' }}
          >
            <div className='card-header'>
              <p className='h5 fw-bold'>อื่น ๆ</p>
            </div>
            <div className='card-body' style={{ backgroundColor: '#EAE7E2' }}>
              <div className='row'>
                <div className='col'>
                  <h6 className='fw-bold'>ค่าน้ำ</h6>
                  <div className='form-group row align-items-center'>
                    <label
                      for='WaterPrice'
                      className='col-sm-3 col-md-3 col-form-label'
                    >
                      ราคา/หน่วย
                    </label>
                    <div className='col-sm-9 col-md-9'>
                      <input
                        type='text'
                        className='form-control'
                        name='WaterPrice'
                        id='WaterPrice'
                        value={waterprice}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group row align-items-center'>
                    <label
                      for='MinWaterUnit'
                      className='col-sm-3 col-md-3 col-form-label'
                    >
                      หน่วยขั้นต่ำ
                    </label>
                    <div className='col-sm-9 col-md-9'>
                      <input
                        type='text'
                        className='form-control'
                        name='MinWaterUnit'
                        id='MinWaterUnit'
                        value={minwaterunit}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group row align-items-center'>
                    <label
                      for='input_id_1'
                      className='col-sm-3 col-md-3 col-form-label'
                    >
                      ราคาขั้นต่ำ
                    </label>
                    <div className='col-sm-9 col-md-9'>
                      <input
                        type='text'
                        className='form-control'
                        name='input_id_1'
                        id='input_id_1'
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <h6 className='fw-bold'>ค่าไฟ</h6>
                  <div className='form-group row align-items-center'>
                    <label
                      for='ElectricityPrice'
                      className='col-sm-3 col-md-3 col-form-label'
                    >
                      ราคา/หน่วย
                    </label>
                    <div className='col-sm-9 col-md-9'>
                      <input
                        type='text'
                        className='form-control'
                        name='ElectricityPrice'
                        id='ElectricityPrice'
                        value={electricityprice}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default DormSetting;
