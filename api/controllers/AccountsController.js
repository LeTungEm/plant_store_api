'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

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
    authenticate:(rep, res) => {
        let data = req.body;
        let sql = 'SELECT account_id FROM accounts where phone = ?, password = ?';
        db.query(sql, [data.phone, data.password], (err, response) => {
            if (err) throw err
            res.json(response[0])
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
        db.query(sql, [data.address, data.gender, data.birthday, data.phone, data.password, data.status, data.name ,data.email ,data.roleId , accountId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO `accounts`(`address`, `gender`, `birthday`, `phone`, `password`, `status`, `name`, `email`, `role_id`) VALUES (?,?,?,?,?,?,?,?,?)';
        db.query(sql, [data.address, data.gender, data.birthday, data.phone, data.password, data.status, data.name, data.email, data.roleId], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let accountId = req.params.accountId;
        let sql = 'UPDATE `accounts` SET `status`= 0 WHERE `account_id` = ?';
        db.query(sql, [accountId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}
