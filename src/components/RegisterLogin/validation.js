const validation = (registerData) => {
  let errors = {};

  if (!registerData.fname) {
    errors.fname = 'โปรดกรอกชื่อจริงของคุณ';
  }
  if (!registerData.lname) {
    errors.lname = 'โปรดกรอกนามสกุลของคุณ';
  }
  if (!registerData.email) {
    errors.email = 'โปรดกรอกอีเมล';
  } else if (!/\S+@\S+\S+/.test(registerData.email)) {
    errors.email = 'รูปแบบของอีเมลไม่ถูกต้อง';
  }
  if (!registerData.password) {
    errors.password = 'โปรดกรอกรหัสผ่าน';
  } else if (registerData.password.length < 6) {
    errors.password = 'รหัสผ่านควรมีความยาวอย่างต่ำ 6 ตัวอักษร';
  }
  if (!registerData.telno) {
    errors.telno = 'โปรดกรอกเบอร์โทรศัพท์ของคุณ';
  }
  if (!registerData.IDCardNo) {
    errors.IDCardNo = 'โปรดกรอกเลขประจำตัวประชาชน';
  } else if (registerData.password.length !== 13) {
    errors.IDCardNo = 'กรุณากรอกเลขประจำตัวประชาชนให้ครบถ้วน';
  }

  if ((registerData.gender = '...เลือกเพศ')) {
    errors.gender = 'โปรดเลือกเพศของคุณ';
  }
  return errors;
};
export default validation;
