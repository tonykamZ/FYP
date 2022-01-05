/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  'GET /': 'PriceTrackerController.main',
  'GET /priceTracker': 'PriceTrackerController.main',
  'GET /priceTracker/json': 'PriceTrackerController.json',
  'GET /priceTracker/homepage': 'PriceTrackerController.homepage',
  'GET /priceTracker/category/:category': 'PriceTrackerController.category',
  'GET /priceTracker/category/:category/:id': 'PriceTrackerController.product',

  'GET /user/signUp': 'UserController.signUp',
  'POST /user/signUp': 'UserController.signUp',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'GET /user/json': 'UserController.json',
  'GET /user/account/:id': 'UserController.account',
  'GET /user/wallet/:id': 'UserController.wallet',


};