import knex from "knex";
import type {Knex}  from "knex";
import type { Request, Response } from "express";

import knexConfig from "../../knexfile";

const environment: string = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexConfig[environment];
const knexdb = knex(config);


interface MenuItem {
    item_id: number;
    restaurant_id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  }


// GET ALL MENU ITEMS
export const getAllMenuItems = (req: Request, res: Response) => {
    knexdb<MenuItem>('menu_items').select('*')
    .then(allItems => res.json(allItems))
    .catch(error => res.status(500).json({ error: 'Error occurred while fetching menu items' }));
};

// GET MENU ITEM BY ID
export const  getMenuItemById = (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

     knexdb<MenuItem>('menu_items').where({ item_id: id }).first()
    .then(item  =>  {
        if(item ) {
            res.json(item);
        } else {
            res.status(404).json({error: 'Menu item not found'});  
        }
    })
    .catch(error => res.status(500).json({error: 'Error occurred while fetching menu item'}));
}

// CREATE NEW MENU ITEM
export const  createMenuItem  = (req: Request, res: Response) => {
    const { category_id, category_name, name, description, price, image_url } = req.body;

    if (!category_id) {
        return res.status(400).json({ error: 'Category ID is required' });
      }

      knexdb<MenuItem>('menu_items').insert(req.body).returning('*')
      .then(newItem => res.status(201).json(newItem))
    .catch(error => res.status(500).json({error: 'Error creating new menu item'}));
}

// UPDATE MENU ITEM
export const updateMenuItem = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const { name, description, price, image_url } = req.body;

    knexdb<MenuItem>('menu_items').where({ item_id: id }).update({ name, description, price, image_url })
    .then(updatedItem => {
        if(updatedItem ) {
            return knexdb<MenuItem>('menu_items').where({ item_id: id }).first();
        } else {
            res.status(404).json({ error: 'Menu item not found' });
        }
    })
    .then(item => res.status(200).json(item))
    .catch(error => res.status(500).json({ error: 'Error updating menu item' }));
}

// DELETE CATEGORY
export const deleteMenuItem = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    knexdb<MenuItem>('menu_items').where({ item_id: id }).del()
    .then(deletedItem=> {
        if ( deletedItem ) {
            res.status(200).json({ message: 'Menu item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Error while deleting menu item' });
        }
    })
    .catch(error => res.status(500).json({error: 'Error while deleting Category'}));
}

// GET MENU ITEMS BY CATEGORY ID
export const getCategoriesByCategoryId = (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    knexdb<MenuItem>('menu_items').where({ category_id: id })
    .then(items =>  {
        if(items.length > 0) {
            res.json(items);
        } else {
            res.status(404).json({error:'No menu items found for this category'});  
        }
    })
    .catch(error => res.status(500).json({error: 'Error occurred while fetching menu items' }));
}

// GET MENU ITEMS PRICE BY ID
export const getMenuItemPriceById = (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    knexdb<MenuItem>('menu_items').where({ item_id: id }).select('price').first()
    .then(item => {
      if (item) {
        res.json({ price: item.price });
      } else {
        res.status(404).json({ error: 'Menu item not found' });
      }
    })
    .catch(error => res.status(500).json({ error: 'Error occurred while fetching menu item price' }));
};

// GET MENU ITEMS BY RESTAURANT ID
export const getMenuItemsByRestaurantId = (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    knexdb<MenuItem>('menu_items').where({ restaurant_id: id })
    .then(items =>  {
        if(items.length > 0) {
            res.json(items);
        } else {
            res.status(404).json({error:'No menu items found for this restaurant'});  
        }
    })
    .catch(error => res.status(500).json({error: 'Error occurred while fetching menu items' }));
}