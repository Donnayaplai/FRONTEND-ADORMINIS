import React, { useState } from "react";

function DormSetting() {
  const [dormnameth, setDormNameTH] = useState("");
  const [dormnameeng, setDormNameENG] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [province, setProvince] = useState("");
  const [waterprice, setWaterPrice] = useState("");
  const [minwaterunit, setMinWaterUnit] = useState("");
  const [electricityprice, setElectricityPrice] = useState("");
  const [buildingname, SetBuildingName] = useState("");
  const [numoffloor, SetNumofFloor] = useState("");
  const [roomtype, SetRoomType] = useState("");
  const [roomprice, SetRoomPrice] = useState("");

  const onChangeDormNameTH = (e) => {
    const dormnameth = e.target.value;
    setDormNameTH(dormnameth);
  };
  const onChangeDormNameENG = (e) => {
    const dormnameeng = e.target.value;
    setDormNameENG(dormnameeng);
  };
  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };
  const onChangeStreet = (e) => {
    const street = e.target.value;
    setStreet(street);
  };
  const onChangeDistrict = (e) => {
    const district = e.target.value;
    setDistrict(district);
  };
  const onChangeSubdistrict = (e) => {
    const subdistrict = e.target.value;
    setSubdistrict(subdistrict);
  };
  const onChangePostcode = (e) => {
    const postcode = e.target.value;
    setPostcode(postcode);
  };
  const onChangeProvince = (e) => {
    const province = e.target.value;
    setProvince(province);
  };
  const onChangeWaterPrice = (e) => {
    const waterprice = e.target.value;
    setWaterPrice(waterprice);
  };
  const onChangeMinWaterUnit = (e) => {
    const minwaterunit = e.target.value;
    setMinWaterUnit(minwaterunit);
  };
  const onChangeElectricityPrice = (e) => {
    const electricityprice = e.target.value;
    setElectricityPrice(electricityprice);
  };
  const onChangeBuildingName = (e) => {
    const buildingname = e.target.value;
    SetBuildingName(buildingname);
  };
  const onChangeNumofFloor = (e) => {
    const numoffloor = e.target.value;
    SetNumofFloor(numoffloor);
  };
  const onChangeRoomType = (e) => {
    const roomtype = e.target.value;
    SetRoomType(roomtype);
  };
  const onChangeRoomPrice = (e) => {
    const roomprice = e.target.value;
    SetRoomPrice(roomprice);
  };

  return (
    <div>
      <h1 className="text-center mt-3">ตั้งค่าหอพัก</h1>
      <form>
        <div className="container">
          <div
            className="card mx-auto"
            style={{ maxWidth: "1200px", width: "90%" }}
          >
            <div className="card-header">
              <p className="h5 fw-bold">ตั้งค่าที่อยู่</p>
            </div>
            <div className="card-body" style={{ backgroundColor: "#EAE7E2" }}>
              <div className="form-group row align-items-center">
                <label
                  for="dormnameth"
                  className="col-sm-2 col-md-2 col-form-label"
                >
                  ชื่อหอพัก (TH)
                </label>
                <div className="col-sm-10 col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    name="dormnameth"
                    id="dormnameth"
                    placeholder="ตัวอย่าง: หอพัก อดอมินิส"
                    value={dormnameth}
                    onChange={onChangeDormNameTH}
                    required
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label for="dormnameeng" className="col-sm-2 col-form-label">
                  ชื่อหอพัก (ENG)
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="dormnameeng"
                    id="dormnameeng"
                    placeholder="ตัวอย่าง: Adorminis Place"
                    value={dormnameeng}
                    onChange={onChangeDormNameENG}
                    required
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label for="address" className="col-sm-2 col-form-label">
                  ที่อยู่
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    id="address"
                    placeholder="บ้านเลขที่/หมู่ที่/ซอย"
                    value={address}
                    onChange={onChangeAddress}
                    required
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <div className="col-md-6">
                  <label for="street" className="col-sm-2 col-form-label">
                    ถนน
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    id="street"
                    value={street}
                    onChange={onChangeStreet}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="district" className="col-sm-3 col-form-label">
                    แขวง
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="district"
                    id="district"
                    value={district}
                    onChange={onChangeDistrict}
                    required
                  />
                </div>
              </div>
              <div className="form-group row align-items-center">
                <div className="col-md-6">
                  <label for="subdistrict" className="col-sm-2 col-form-label">
                    เขต
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subdistrict"
                    id="subdistrict"
                    value={subdistrict}
                    onChange={onChangeSubdistrict}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="postcode" className="col-sm-3 col-form-label">
                    รหัสไปรษณีย์
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="postcode"
                    id="postcode"
                    value={postcode}
                    onChange={onChangePostcode}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="province" className="col-sm-3 col-form-label">
                    จังหวัด
                  </label>
                  <select
                    className="form-select"
                    name="province"
                    id="province"
                    value={province}
                    onChange={onChangeProvince}
                    required
                  >
                    <option selected>เลือก...</option>
                    <option>กรุงเทพมหานคร</option>
                    <option>กระบี่</option>
                    <option>กาญจนบุรี</option>
                    <option>กาฬสินธุ์</option>
                    <option>กำแพงเพชร</option>
                    <option>ขอนแก่น</option>
                    <option>จันทบุรี</option>
                    <option>ฉะเชิงเทรา</option>
                    <option>ชลบุรี</option>
                    <option>ชัยภูมิ</option>
                    <option>ชุมพร</option>
                    <option>เชียงราย</option>
                    <option>เชียงใหม่</option>
                    <option>ตรัง</option>
                    <option>ตราด</option>
                    <option>ตาก</option>
                    <option>นครนายก</option>
                    <option>นครปฐม</option>
                    <option>นครพนม</option>
                    <option>นครราชสีมา</option>
                    <option>นครศรีธรรมราช</option>
                    <option>นครสวรรค์</option>
                    <option>นนทบุรี</option>
                    <option>นราธิวาส</option>
                    <option>น่าน</option>
                    <option>หนองคาย</option>
                    <option>หนองบัวลำภู</option>
                    <option>บุรีรัมย์</option>
                    <option>ปทุมธานี</option>
                    <option>ประจวบคีรีขันธ์</option>
                    <option>ปราจีนบุรี</option>
                    <option>ปัตตานี</option>
                    <option>พระนครศรีอยุธยา</option>
                    <option>พังงา</option>
                    <option>พัทลุง</option>
                    <option>พิจิตร</option>
                    <option>พิษณุโลก</option>
                    <option>เพชรบุรี</option>
                    <option>เพชรบูรณ์</option>
                    <option>แพร่</option>
                    <option>พะเยา</option>
                    <option>ภูเก็ต</option>
                    <option>มหาสารคาม</option>
                    <option>แม่ฮ่องสอน</option>
                    <option>มุกดาหาร</option>
                    <option>ยะลา</option>
                    <option>ยโสธร</option>
                    <option>ร้อยเอ็ด</option>
                    <option>ระนอง</option>
                    <option>ระยอง</option>
                    <option>ราชบุรี</option>
                    <option>ลพบุรี</option>
                    <option>ลำปาง</option>
                    <option>ลำพูน</option>
                    <option>เลย</option>
                    <option>ศรีสะเกษ</option>
                    <option>สกลนคร</option>
                    <option>สงขลา</option>
                    <option>สตูล</option>
                    <option>สมุทรปราการ</option>
                    <option>สมุทรสงคราม</option>
                    <option>สมุทรสาคร</option>
                    <option>สระแก้ว</option>
                    <option>สระบุรี</option>
                    <option>สิงห์บุรี</option>
                    <option>สุโขทัย</option>
                    <option>สุพรรณบุรี</option>
                    <option>สุราษฎร์ธานี</option>
                    <option>สุรินทร์</option>
                    <option>อ่างทอง</option>
                    <option>อุดรธานี</option>
                    <option>อุทัยธานี</option>
                    <option>อุตรดิตถ์</option>
                    <option>อุบลราชธานี</option>
                    <option>อำนาจเจริญ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card mx-auto mt-5"
            style={{ maxWidth: "1200px", width: "90%" }}
          >
            <div className="card-header">
              <p className="h5 fw-bold">ตั้งค่าตึก</p>
            </div>
            <div className="card-body" style={{ backgroundColor: "#EAE7E2" }}>
              <div className="row">
                <div className="col">
                  <div className="form-group row align-items-center">
                    <label
                      for="buildingname"
                      className="col-sm-3 col-md-2 col-form-label"
                    >
                      ชื่อตึก
                    </label>
                    <div className="col-sm-9 col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        name="buildingname"
                        id="buildingname"
                        value={buildingname}
                        onChange={onChangeBuildingName}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group row align-items-center">
                    <label
                      for="numoffloor"
                      className="col-sm-3 col-md-3 col-form-label"
                    >
                      จำนวนชั้น
                    </label>
                    <div className="col-sm-9 col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="numoffloor"
                        id="numoffloor"
                        value={numoffloor}
                        min="1"
                        onChange={onChangeNumofFloor}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card mx-auto mt-5"
            style={{ maxWidth: "1200px", width: "90%" }}
          >
            <div className="card-header">
              <p className="h5 fw-bold">ตั้งค่าห้องพัก</p>
            </div>
            <div className="card-body" style={{ backgroundColor: "#EAE7E2" }}>
              <div className="row">
                <div className="col">
                  <div className="form-group row align-items-center">
                    <label
                      for="roomtype"
                      className="col-sm-3 col-md-3 col-form-label"
                    >
                      ประเภทห้อง
                    </label>
                    <div className="col-sm-9 col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="roomtype"
                        id="buildingname"
                        value={roomtype}
                        onChange={onChangeRoomType}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group row align-items-center">
                    <label
                      for="roomprice"
                      className="col-sm-3 col-md-2 col-form-label"
                    >
                      ราคา
                    </label>
                    <div className="col-sm-9 col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        name="roomprice"
                        id="roomprice"
                        value={roomprice}
                        min="1"
                        onChange={onChangeRoomPrice}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card mx-auto mt-5 mb-3"
            style={{ maxWidth: "1200px", width: "90%" }}
          >
            <div className="card-header">
              <p className="h5 fw-bold">อื่น ๆ</p>
            </div>
            <div className="card-body" style={{ backgroundColor: "#EAE7E2" }}>
              <div className="row">
                <div className="col">
                  <h6 className="fw-bold">ค่าน้ำ</h6>
                  <div className="form-group row align-items-center">
                    <label
                      for="WaterPrice"
                      className="col-sm-3 col-md-3 col-form-label"
                    >
                      ราคา/หน่วย
                    </label>
                    <div className="col-sm-9 col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="WaterPrice"
                        id="WaterPrice"
                        value={waterprice}
                        onChange={onChangeWaterPrice}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label
                      for="MinWaterUnit"
                      className="col-sm-3 col-md-3 col-form-label"
                    >
                      หน่วยขั้นต่ำ
                    </label>
                    <div className="col-sm-9 col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="MinWaterUnit"
                        id="MinWaterUnit"
                        value={minwaterunit}
                        onChange={onChangeMinWaterUnit}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label
                      for="input_id_1"
                      className="col-sm-3 col-md-3 col-form-label"
                    >
                      ราคาขั้นต่ำ
                    </label>
                    <div className="col-sm-9 col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="input_id_1"
                        id="input_id_1"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <h6 className="fw-bold">ค่าไฟ</h6>
                  <div className="form-group row align-items-center">
                    <label
                      for="ElectricityPrice"
                      className="col-sm-3 col-md-3 col-form-label"
                    >
                      ราคา/หน่วย
                    </label>
                    <div className="col-sm-9 col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="ElectricityPrice"
                        id="ElectricityPrice"
                        value={electricityprice}
                        onChange={onChangeElectricityPrice}
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
