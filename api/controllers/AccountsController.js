'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const { hashPassword, verifyPassword } = require('../../function/hashPassword');
const { log } = require('console');


module.exports = {
    getAll: (req, res) => {
        let sql = 'SELECT * FROM accounts';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getByStatus: (req, res) => {
        let sql = 'SELECT * FROM accounts where status = 1';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    isEmailExists: (req, res) => {
        let data = req.body;
        let sql = 'SELECT count(*) as existsNumber FROM `accounts` WHERE email = ?';
        db.query(sql, [data.email], (err, response) => {
            if (err) throw err
            if (response[0].existsNumber > 0)
                res.json({ message: true })
            else
                res.json({ message: false })
        })
    },

    isRemember: (req, res) => {
        let userEmail = req.cookies.userEmail;
        res.json({ userEmail: userEmail });
    },

    authenticate: (req, res) => {
        let data = req.body;
        let sql = 'SELECT account_id, password, salt FROM accounts where email = ?';
        db.query(sql, [data.email], (err, response) => {
            if (err) throw err
            if (response.length > 0) {
                let infoLogin = response[0];
                const isPasswordCorrect = verifyPassword(data.password, infoLogin.password, infoLogin.salt);
                res.cookie('userEmail', data.email, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                res.json({ message: isPasswordCorrect, userId: infoLogin.account_id });
            } else {
                res.json({ message: false });
            }
        })
    },
    detail: (req, res) => {
        let accountId = req.params.accountId;
        let sql = 'SELECT * FROM accounts WHERE account_id = ?';
        db.query(sql, [accountId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let accountId = req.params.accountId;
        let sql = 'UPDATE `accounts` SET `address`= ?,`gender`= ?,`birthday`= ?,`phone`= ?,`password`= ?,`status`= ?,`name`= ?,`email`= ?,`role_id`= ? WHERE `account_id` = ?';
        db.query(sql, [data.address, data.gender, data.birthday, data.phone, data.password, data.status, data.name, data.email, data.roleId, accountId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        const hashedPasswordObj = hashPassword(data.password);
        let sql = 'INSERT INTO `accounts`(`address`, `gender`, `birthday`, `phone`, `password`, `name`, `email`, `role_id`, `salt`) VALUES (?,?,?,?,?,?,?,?,?)';
        db.query(sql, [data.address, data.gender, data.birthday, data.phone, hashedPasswordObj.passwordHash, data.name, data.email, data.roleId, hashedPasswordObj.salt], (err, response) => {
            if (err) throw err
            res.json({ message: true })
        })
    },
    delete: (req, res) => {
        let accountId = req.params.accountId;
        let sql = 'UPDATE `accounts` SET `status`= 0 WHERE `account_id` = ?';
        db.query(sql, [accountId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}
