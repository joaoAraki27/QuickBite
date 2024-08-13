import knex from "knex";
import type { Knex } from "knex";
import type { Request, Response } from "express";

import knexConfig from "../../knexfile";

const environment: string = process.env.NODE_ENV || "development";
const config: Knex.Config = knexConfig[environment];
const knexdb = knex(config);

//GET ALL RESTAURANTS
export const getAllrestaurants = (req: Request, res: Response) => {
  knexdb("restaurants")
    .select("*")
    .then((allrestaurants) => res.json(allrestaurants))
    .catch((error) => res.status(500).json({ error: "error occured" }));
};

//GET RESTAURANTS BY ID
export const getRestaurantsById = (req: Request, res: Response) => {
  const { id } = req.params;
  knexdb("restaurants")
    .where({ restaurants_id: id })
    .first()
    .then((restaurantsID) => {
      if (restaurantsID) {
        res.json(restaurantsID);
      } else {
        res.status(404).json({ error: "not found" });
      }
    })
    .catch((error) => res.status(404).json({ error: "error occured" }));
};

//CREATE NEW RESTAURANTS
export const createRestaurants = (req: Request, res: Response) => {
  const { user_id, name, logo_url, phone_number, line_id, address } = req.body;

   if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  knexdb("restaurants")
    .insert(req.body)
    .returning("*")
    .then((newRestaurant) => res.status(201).json(newRestaurant))
    .catch((error) =>
      res.status(500).json({ error: "error create new Restaurant" })
    );
};

// UPDATE RESTAURANT
export const updateRestaurants = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, logo_url, phone_number, line_id, address } = req.body;
  knexdb("restaurants")
    .where({ restaurant_id: id })
    .update(req.body)
    .then((updatedRestaurantInfo) => {
      if (updatedRestaurantInfo) {
        return knexdb("restaurants").where({ restaurant_id: id }).first();
      } else {
        res.status(404).json({ error: "Restaurant not found" });
      }
    })
    .then((updatedRestaurant) => res.status(200).json(updatedRestaurant))
    .catch((error) =>
      res.status(500).json({ error: "Error updating restaurant" })
    );
};

// DELETE RESTAURANT
export const deleteRestaurants = (req: Request, res: Response) => {
  const { id } = req.params;
  knexdb("restaurants")
    .where({  restaurant_id: id })
    .delete()
    .then((deletedRestaurant) => {
      if (deletedRestaurant) {
        res.status(200).json({ message: "Restaurant deleted successfully" });
      } else {
        res.status(404).json({ error: "Restaurant not found" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Error deleting restaurant" })
    );
};

// GET ALL RESTAURANTS BY OWNER ID
export const getRestaurantsByOwnerId = (req: Request, res: Response) => {
  const { id } = req.params;
  knexdb("restaurants")
    .where({ owner_id: id })
    .then((restaurants) => {
      if (restaurants.length > 0) {
        res.json(restaurants);
      } else {
        res.status(404).json({ error: "No restaurants found for this user" });
      }
    })
    .catch((error) => res.status(500).json({ error: "Error fetching restaurants" }));
};