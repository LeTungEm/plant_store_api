'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        let sql = 'SELECT * FROM `plants`';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getByStatus: (req, res) => {
        let sql = 'SELECT plants_categories.category_ids, plants.plant_id, plants.name, plants.slug, plants.score, GROUP_CONCAT(plant_set.tool_color_id) as tool_color, GROUP_CONCAT(colors.code) as color_code, GROUP_CONCAT(plant_set.tool_size_id) as tool_size, plants.image, COALESCE(max(plant_set.price),0) as max_price, COALESCE(min(plant_set.price),0) as min_price, `is_sale`, COALESCE(max(plant_set.sale_price),0) as max_sale_price, COALESCE(min(plant_set.sale_price),0) as min_sale_price FROM `plant_set` INNER JOIN plants on plant_set.plant_id = plants.plant_id INNER JOIN colors on colors.color_id = plant_set.tool_color_id INNER JOIN (SELECT plants.plant_id, GROUP_CONCAT(plants_categories.category_id) as category_ids FROM plants_categories INNER JOIN plants on plants.plant_id = plants_categories.plant_id GROUP BY plants.plant_id) as plants_categories on plant_set.plant_id = plants_categories.plant_id WHERE plants.status = 1 and plant_set.status = 1 GROUP BY plant_set.plant_id;';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let plantSlug = req.params.plantSlug;
        let sql = 'SELECT plants.plant_id, plants.name, plants.slug, plants.quantity as plant_quantity, plant_set.tool_quantity, plants.description,plants.score,plants.fun_fact,plants.light,plants.pet_friendly,plants.water,plants.sad_plant_signs,plants.supplier_id, plant_set.image,plant_set.price,plant_set.is_sale,plant_set.sale_price, plant_set.tool_id, tools.name as tool, plant_set.tool_color_id, colors.name as color, colors.code as color_code, plant_set.tool_size_id, sizes.name as size FROM `plants` INNER JOIN plant_set on plant_set.plant_id = plants.plant_id INNER JOIN tools on tools.tool_id = plant_set.tool_id INNER JOIN colors on colors.color_id = plant_set.tool_color_id INNER JOIN sizes on sizes.size_id = plant_set.tool_size_id WHERE plants.status = 1 and plants.slug = ?';
        db.query(sql, [plantSlug], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    search: (req, res) => {
        let search = req.params.search;
        search = `%${search}%`;
        let sql = 'SELECT plants_categories.category_ids, plants.plant_id, plants.name, plants.slug, plants.score, GROUP_CONCAT(plant_set.tool_color_id) as tool_color, GROUP_CONCAT(colors.code) as color_code, GROUP_CONCAT(plant_set.tool_size_id) as tool_size, plants.image, COALESCE(max(plant_set.price),0) as max_price, COALESCE(min(plant_set.price),0) as min_price, `is_sale`, COALESCE(max(plant_set.sale_price),0) as max_sale_price, COALESCE(min(plant_set.sale_price),0) as min_sale_price FROM `plant_set` INNER JOIN plants on plant_set.plant_id = plants.plant_id INNER JOIN colors on colors.color_id = plant_set.tool_color_id INNER JOIN (SELECT plants.plant_id, GROUP_CONCAT(plants_categories.category_id) as category_ids FROM plants_categories INNER JOIN plants on plants.plant_id = plants_categories.plant_id GROUP BY plants.plant_id) as plants_categories on plant_set.plant_id = plants_categories.plant_id' +
            ' WHERE plants.status = 1 and plant_set.status = 1 and plants.name like ? GROUP BY plant_set.plant_id;';
        db.query(sql, [search], (err, response) => {
            if (err) throw err
            res.json(response)
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
