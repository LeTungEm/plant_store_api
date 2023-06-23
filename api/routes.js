'use strict';
module.exports = function (app) {
    let accountsController = require('./controllers/AccountsController');
    let accountsServicesController = require('./controllers/AccountsServicesController');
    let categoriesController = require('./controllers/CategoriesController');
    let plantsCategoriesController = require('./controllers/PlantsCategoriesController');
    let toolsCategoriesController = require('./controllers/ToolsCategoriesController');
    let plantsController = require('./controllers/PlantsController');
    let toolsController = require('./controllers/ToolsController');
    let colorsController = require('./controllers/ColorsController');

    let hashPass = require('./controllers/testHashPass');
    app.route('/hash').get(hashPass.getAll);

    let { uploadFile } = require('./controllers/UploadFileController');
    let { getFile } = require('./controllers/GetFileController');

    // Table Accounts
    app.route('/accounts')
        .get(accountsController.getAll)
        .post(accountsController.store);
    app.route('/accounts/active')
        .get(accountsController.getByStatus);
    app.route('/accounts/isRemember')
        .get(accountsController.isRemember);
    app.route('/accounts/email/exists')
        .post(accountsController.isEmailExists);
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

    // Table Categories
    app.route('/categories')
        .get(categoriesController.getAll)
        .post(categoriesController.store);
    app.route('/categories/active')
        .get(categoriesController.getByStatus);
    app.route('/categories/display')
        .get(categoriesController.getDisplayCategories);
    app.route('/categories/special')
        .get(categoriesController.getSpecialCategories);
    app.route('/categories/parent/:parentSlug')
        .get(categoriesController.getByParentSlug);
    // app.route('/categories/:categoryId')
    //     .get(categoriesController.detail)
    //     .put(categoriesController.update)
    //     .delete(categoriesController.delete);

    // Table Colors
    app.route('/colors/used_by_plants')
        .get(colorsController.getUsedByPlants);
    app.route('/colors/used_by_tools')
        .get(colorsController.getUsedByTools);

    // Table Plants_categories
    app.route('/plants_categories/:categorySlug')
        .get(plantsCategoriesController.getByCategoriesSlug);

    // Table Tools_categories
    app.route('/tools_categories/:categoryId')
        .get(toolsCategoriesController.getByCategoriesId);

    // Table Plants
    app.route('/plants')
        .get(plantsController.getAll)
        .post(plantsController.store);
    app.route('/plants/active')
        .get(plantsController.getByStatus);
    app.route('/plants/search/:search')
        .get(plantsController.search);
    app.route('/plants/:plantSlug')
        .get(plantsController.detail)
        .put(plantsController.update)
        .delete(plantsController.delete);

    // Table Tools
    app.route('/tools')
        .get(toolsController.getAll)
        .post(toolsController.store);
    app.route('/tools/active')
        .get(toolsController.getByStatus);
    app.route('/tools/search/:search')
        .get(toolsController.search);
    app.route('/tools/:toolSlug')
        .get(toolsController.detail)
        .put(toolsController.update)
        .delete(toolsController.delete);

    // Get file
    app.route('/images/:folderName/:fileName')
        .get(getFile);


    // app.get('/images', (req, res) => {
    //     const imagePath = join(__dirname, '../', 'uploads', 'plants', 'simple1.jpg');
    //     res.sendFile(imagePath);
    // });

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
