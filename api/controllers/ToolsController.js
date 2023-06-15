'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        let sql = 'SELECT * FROM `tools`';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getByStatus: (req, res) => {
        let sql = 'SELECT tools_categories.category_ids,tools.tool_id , tools.name, tools.slug, tools.score, GROUP_CONCAT(plant_set.tool_color_id) as tool_color, GROUP_CONCAT(colors.code) as color_code, GROUP_CONCAT(plant_set.tool_size_id) as tool_size, tools.image, COALESCE(max(plant_set.price),0) as max_price, COALESCE(min(plant_set.price),0) as min_price, `is_sale`, COALESCE(max(plant_set.sale_price),0) as max_sale_price, COALESCE(min(plant_set.sale_price),0) as min_sale_price FROM `plant_set` INNER JOIN tools on plant_set.tool_id = tools.tool_id INNER JOIN colors on colors.color_id = plant_set.tool_color_id INNER JOIN (SELECT tools.tool_id, GROUP_CONCAT(tools_categories.category_id) as category_ids FROM tools_categories INNER JOIN tools on tools.tool_id = tools_categories.tool_id GROUP BY tools.tool_id) as tools_categories on plant_set.tool_id = tools_categories.tool_id WHERE tools.status = 1 and plant_set.plant_id = 1 and plant_set.status = 1 GROUP BY plant_set.tool_id;';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let toolSlug = req.params.toolSlug;
        let sql = 'SELECT plant_set.plant_id, tools.name, tools.slug, plant_set.tool_quantity, tools.description,tools.score, tools.supplier_id, plant_set.image,plant_set.price,plant_set.is_sale,plant_set.sale_price, plant_set.tool_id, plant_set.tool_color_id, colors.name as color, colors.code as color_code, plant_set.tool_size_id, sizes.name as size FROM `plant_set` INNER JOIN `tools` on plant_set.tool_id = tools.tool_id INNER JOIN colors on colors.color_id = plant_set.tool_color_id INNER JOIN sizes on sizes.size_id = plant_set.tool_size_id WHERE tools.status = 1 and plant_set.plant_id = 1 and tools.slug = ?';
        db.query(sql, [toolSlug], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    search: (req, res) => {
        let search = req.params.search;
        search = `%${search}%`;
        let sql = 'SELECT tools_categories.category_ids,tools.tool_id , tools.name, tools.slug, tools.score, GROUP_CONCAT(plant_set.tool_color_id) as tool_color, GROUP_CONCAT(colors.code) as color_code, GROUP_CONCAT(plant_set.tool_size_id) as tool_size, tools.image, COALESCE(max(plant_set.price),0) as max_price, COALESCE(min(plant_set.price),0) as min_price, `is_sale`, COALESCE(max(plant_set.sale_price),0) as max_sale_price, COALESCE(min(plant_set.sale_price),0) as min_sale_price FROM `plant_set` INNER JOIN tools on plant_set.tool_id = tools.tool_id INNER JOIN colors on colors.color_id = plant_set.tool_color_id INNER JOIN (SELECT tools.tool_id, GROUP_CONCAT(tools_categories.category_id) as category_ids FROM tools_categories INNER JOIN tools on tools.tool_id = tools_categories.tool_id GROUP BY tools.tool_id) as tools_categories on plant_set.tool_id = tools_categories.tool_id ' +
            ' WHERE tools.status = 1 and plant_set.plant_id = 1 and plant_set.status = 1 and tools.name like ? GROUP BY plant_set.tool_id;';
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
