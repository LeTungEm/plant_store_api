'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        let sql = 'SELECT payment_method_id, name FROM `payment_methods` where status = 1';
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
        let sql = 'INSERT INTO `order`(`transport_fee`, `name_receiver`, `phone_receiver`, `address_receiver`, `is_pay`, `note`, `delete_reason`, `pay_date`, `account_id`, `coupon_id`, `shipping_provider_id`, `payment_method_id`, `total`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        db.query(sql, [data.transportFee, data.nameReceiver, data.phoneReceiver, data.addressReceiver, data.isPay, data.note, data.deleteReason, data.payDate, data.accountId, data.couponId, data.shippingProviderId, data.paymentMethodId, data.total], (err, response) => {
            if (err) throw err
            res.json({ message: true, orderId: response.insertId })
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
