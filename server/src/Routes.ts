import { Router } from "express";
import * as userController from "./controllers/userController";
import * as restaurantsController from "./controllers/restaurantsController";
import * as categoriesController from "./controllers/categoriesController";
import * as menuItemsController from "./controllers/menuItemsController";
import * as addressController from "./controllers/addressController";

const router = Router();

// User routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Restaurants routes
router.get("/restaurants", restaurantsController.getAllrestaurants);
router.get("/restaurants/:id", restaurantsController.getRestaurantsById);
router.post("/restaurants", restaurantsController.createRestaurants);
router.put("/restaurants/:id", restaurantsController.updateRestaurants);
router.delete("/restaurants/:id", restaurantsController.deleteRestaurants);
router.get("/restaurants/owner/:id", restaurantsController.getRestaurantsByOwnerId);

// Categories routes
router.get("/categories", categoriesController.getAllCategories);
router.get("/categories/:id", categoriesController.getCategoryById);
router.post("/categories", categoriesController.createCategory);
router.put("/categories/:id", categoriesController.updateCategory);
router.delete("/categories/:id", categoriesController.deleteCategory);
router.get("/categories/restaurant/:id", categoriesController.getCategoriesByRestaurantId);

// Menu_Items routes
router.get("/items", menuItemsController.getAllMenuItems);
router.get("/items/:id", menuItemsController.getMenuItemById);
router.post("/items", menuItemsController.createMenuItem);
router.put("/items/:id", menuItemsController.updateMenuItem);
router.delete("/items/:id", menuItemsController.deleteMenuItem);
router.get("/items/category/:id", menuItemsController.getCategoriesByCategoryId);
router.get("/items/:id/price", menuItemsController.getMenuItemPriceById);
router.get("/items/restaurant/:id", menuItemsController.getMenuItemsByRestaurantId);

// Adress controllers
router.get("/address", addressController.getAllAddresses);
router.get("/address/:id", addressController.getAddressById);
router.post("/address", addressController.createAddress);
router.put("/address/:id", addressController.updateAddress);
router.delete("/address/:id", addressController.deleteAddress);
router.get("/address/user/:user_id", addressController.getAddressesByUserId);


export default router;