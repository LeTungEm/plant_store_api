'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        let sql = 'SELECT * FROM `categories`';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getByStatus: (req, res) => {
        let sql = 'SELECT * FROM `categories` where status = 1';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let categoryId = req.params.categoryId;
        let sql = 'SELECT * FROM `categories` WHERE category_id = ?';
        db.query(sql, [categoryId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let categoryId = req.params.categoryId;
        let sql = 'UPDATE `categories` SET `name`= ?,`parent_id`= ?,`status`= ?,`slug`= ? WHERE `category_id` = ?';
        db.query(sql, [data.name, data.parentId, data.status, data.slug, categoryId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO `categories`(`name`, `parent_id`, `status`, `slug`) VALUES (?,?,?,?)';
        db.query(sql, [data.name, data.parentId, data.status, data.slug], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let categoryId = req.params.categoryId;
        let sql = 'UPDATE `categories` SET `status` = 0 where `category_id` = ?';
        db.query(sql, [categoryId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}
