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
    getByParentId: (req, res) => {
        let parentId = req.params.parentId;
        let sql = 'SELECT t2.category_id, t2.name,t2.slug,t2.image FROM categories as t1 INNER JOIN categories as t2 on t1.category_id = t2.parent_id WHERE t1.slug = ? and t2.status  = 1';
        db.query(sql, [parentId], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getDisplayCategories: (req, res) => {
        let sql = 'SELECT category_id, name, slug FROM `categories` where display = 1 and status = 1';
        db.query(sql, (err, response) => {
            if (err) throw errxa
            res.json(response)
        })
    },
    getSpecialCategories: (req, res) => {
        let sql = 'SELECT category_id, name, slug, image FROM `categories` where special = 1 and status = 1';
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
