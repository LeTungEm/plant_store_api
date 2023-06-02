'use strict';
module.exports = function (app) {
    let accountsController = require('./controllers/AccountsController');
    let accountsServicesController = require('./controllers/AccountsServicesController');

    let hashPass = require('./controllers/testHashPass');
    app.route('/hash').get(hashPass.getAll);

    let { uploadFile } = require('./controllers/UploadFileController');

    // Table Accounts
    app.route('/accounts')
        .get(accountsController.getAll)
        .post(accountsController.store);
    app.route('/accounts/active')
        .get(accountsController.getByStatus);
    app.route('/accounts/:accountId')
        .get(accountsController.detail)
        .put(accountsController.update)
        .delete(accountsController.delete);
    app.route('/accounts/authenticate')
        .post(accountsController.authenticate);

    // Table Accounts_Services
    app.route('/accounts_services')
        .get(accountsServicesController.getAll)
        .post(accountsServicesController.store);
    app.route('/accounts_services')
        .delete(accountsServicesController.delete);
    app.route('/accounts_services/accounts/:accountId')
        .get(accountsServicesController.getByAccountId);
    app.route('/accounts_services/services/:serviceId')
        .get(accountsServicesController.getByServiceId);



    // Upload file
    app.route('/uploadFile')
        .post(uploadFile);

    // todoList Routes
    // app.route('/products')
    //     .get(productsCtrl.get)
    //     .post(productsCtrl.store);

    // app.route('/products/:productId')
    //     .get(productsCtrl.detail)
    //     .put(productsCtrl.update)
    //     .delete(productsCtrl.delete);


};
