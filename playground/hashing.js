const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'test hashing password';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    // console.log(hash, '   ', salt);
  });
});

var hashedPass = '$2a$10$7DowNP3j5F7rNfc2VDtBfe9P3zgHOJ0XUFIh21a87PhjphSOhZPuS';
bcrypt.compare('test hashing password', hashedPass, (err, res) => {
  console.log(res);
});

// test jwt
// var data = {
//   id: 10,
// };
// var token = jwt.sign(data, '123az');
// console.log(token);
// var decode = jwt.verify(token, '123az');
// console.log(decode);

// Convert using hash
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);
// var data = {
//   id: 4,
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secret').toString(),
// };
// var result = SHA256(JSON.stringify(token.data) + 'secret').toString();
// if (result == token.hash) {
//   console.log('good');
// } else {
//   console.log('something happen');
// }
