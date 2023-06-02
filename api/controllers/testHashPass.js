'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { hashPassword, verifyPassword } = require('../../function/hashPassword');

module.exports = {
    getAll: (req, res) => {
        let response = {};
        const plainPassword = 'myPassword123';
        const hashedPasswordObj = hashPassword(plainPassword);

        response = {'Plain Password: ': plainPassword, ...response};
        response = {'Salt: ': hashedPasswordObj.salt, ...response};
        response = {'Hashed Password: ': hashedPasswordObj.passwordHash, ...response};

        // Xác thực mật khẩu
        const passwordToVerify = 'myPassword123';
        const isPasswordCorrect = verifyPassword(passwordToVerify, hashedPasswordObj.passwordHash, hashedPasswordObj.salt);

        response = {'Is Password Correct: ': isPasswordCorrect, ...response};

        res.json(response)
    },
}
