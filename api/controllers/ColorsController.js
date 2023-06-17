'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        let sql = 'SELECT * FROM `colors`';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getUsedByPlants: (req, res) => {
        let sql = 'SELECT DISTINCT color_id,`code`,`name` FROM `colors` INNER JOIN plant_set on colors.color_id = plant_set.tool_color_id WHERE code is NOT null and plant_set.plant_id != 1';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    getUsedByTools: (req, res) => {
        let sql = 'SELECT DISTINCT color_id,`code`,`name` FROM `colors` INNER JOIN plant_set on colors.color_id = plant_set.tool_color_id WHERE plant_set.plant_id = 1 and code is NOT null';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    detail: (req, res) => {
        let plantId = req.params.plantId;
        let sql = 'SELECT * FROM `plants` WHERE `plant_id` = ?';
        db.query(sql, [plantId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let plantId = req.params.plantId;
        let sql = 'UPDATE `plants` SET `name`= ?, `price`= ?,`is_sale`= ?,`sale_price`= ? , `slug`= ?, `short_description`= ?, `description`= ?, `fun_fact`= ?, `status`= ?, `images`= ?, `light`= ?, `pet_friendly`= ?, `water`= ?, `sad_plant_signs`= ?,  `supplier_id`= ?,  WHERE `plant_id` = ?';
        db.query(sql, [data.name, data.price, data.isSale, data.salePrice, data.slug, data.shortDescription, data.description, data.funFact, data.status, data.images, data.light, data.petFriendly, data.water, data.sadPlantSigns, data.supplierId, plantId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO `plants`(`name`, `price`, `is_sale`, `sale_price`, `slug`, `short_description`, `description`, `fun_fact`, `status`, `images`, `light`, `pet_friendly`, `water`, `sad_plant_signs`, `supplier_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        db.query(sql, [data.name, data.price, data.isSale, data.salePrice, data.slug, data.shortDescription, data.description, data.funFact, data.status, data.images, data.light, data.petFriendly, data.water, data.sadPlantSigns, data.supplierId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let plantId = req.params.plantId;
        let sql = 'UPDATE `plants` SET `status` = 0 where `plant_id` = ?';
        db.query(sql, [plantId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}
