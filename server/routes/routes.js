const controller = require('../controllers/controller');
const path = require('path');

module.exports = app => {
  app.get('/api/categories', controller.getCategoryList);
  app.post('/api/categories', controller.createCategory);
  app.put('/api/categories/:id', controller.editCategoryById);
  app.delete('/api/categories/:id', controller.deleteCategoryById);
  app.get('/api/resources/all', controller.getAllResources);
  app.get('/api/resources/:id', controller.getResourceById);
  app.get('/api/resources', controller.getResourcesWithQueryParams);
  app.get('/api/resourcesByCategoryId/:categoryId', controller.getResourcesByCategoryId);
  app.post('/api/resources', controller.createResource);
  app.put('/api/resources/:id', controller.editResourceById);
  app.delete('/api/resources/:id', controller.deleteResourceById);
  // app.all("*", (req, res, next) => {
  //   res.sendFile(path.resolve('./public/dist/public/index.html'));
  // });
}