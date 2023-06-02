const crypto = require('crypto');

module.exports = {
  hashPassword: (password) => {
    const salt = crypto.randomBytes(16).toString('hex'); // Tạo muối ngẫu nhiên
    const iterations = 100000; // Số lần lặp để mở rộng khóa
    const keyLength = 64; // Độ dài khóa được tạo ra
  
    const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
    return {
      salt: salt,
      passwordHash: hashedPassword.toString('hex')
    };
  },
  
  verifyPassword: (password, hashedPassword, salt) => {
    const iterations = 100000; // Số lần lặp để mở rộng khóa
    const keyLength = 64; // Độ dài khóa
  
    const hashToVerify = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
    const hashedPasswordToVerify = hashToVerify.toString('hex');
  
    return hashedPassword === hashedPasswordToVerify;
  }
}



// // Tạo mật khẩu mới
// const plainPassword = 'myPassword123';
// const hashedPasswordObj = hashPassword(plainPassword);

// console.log('Plain Password:', plainPassword);
// console.log('Salt:', hashedPasswordObj.salt);
// console.log('Hashed Password:', hashedPasswordObj.passwordHash);

// // Xác thực mật khẩu
// const passwordToVerify = 'myPassword123';
// const isPasswordCorrect = verifyPassword(passwordToVerify, hashedPasswordObj.passwordHash, hashedPasswordObj.salt);

// console.log('Is Password Correct:', isPasswordCorrect);
