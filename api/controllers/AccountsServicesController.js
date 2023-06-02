'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        let sql = 'SELECT * FROM `accounts_services`';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getByAccountId: (req, res) => {
        let accountId = req.params.accountId;
        let sql = 'SELECT * FROM `accounts_services` WHERE `account_id` = ?';
        db.query(sql, [accountId], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getByServiceId: (req, res) => {
        let serviceId = req.params.serviceId;
        let sql = 'SELECT * FROM `accounts_services` WHERE `service_id` = ?';
        db.query(sql, [serviceId], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO `accounts_services`(`phone`, `email`, `address`, `status`, `account_id`, `service_id`) VALUES (?,?,?,?,?,?)';
        db.query(sql, [data.phone, data.email, data.address, data.status, data.account_id, data.service_id], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let accountServiceId = req.params.accountServiceId;
        let sql = 'UPDATE `accounts_services` SET `status` = 0 where account_service_id = ?';
        db.query(sql, [accountServiceId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}
