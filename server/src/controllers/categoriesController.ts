import knex from "knex";
import type {Knex}  from "knex";
import type { Request, Response } from "express";

import knexConfig from "../../knexfile";

const environment: string = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexConfig[environment];
const knexdb = knex(config);


interface Categories {
category_id: number,
restaurant_id: number,
name: string,
description: string
}


// GET ALL CATEGORIES
export const getAllCategories = (req: Request, res: Response) => {
    knexdb<Categories>('categories').select('*')
    .then(allCategories => res.json(allCategories))
    .catch(error => res.status(500).json({error: 'error occured'}));
} 

// GET CATEGORY BY ID
export const  getCategoryById = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    knexdb<Categories>('categories').where({  category_id :id }).first()
    .then(category =>  {
        if(category) {
            res.json(category);
        } else {
            res.status(404).json({error:'Category not found'});  
        }
    })
    .catch(error => res.status(404).json({error: 'error occured'}));
}

// CREATE NEW CATEGORY
export const  createCategory = (req: Request, res: Response) => {
    const { restaurant_id, name, description } = req.body;

    if (!restaurant_id) {
        return res.status(400).json({ error: 'Restaurant ID is required' });
      }

    knexdb<Categories>('categories').insert(req.body).returning('*')
    .then(newCategory =>   res.status(201).json(newCategory))
    .catch(error => res.status(500).json({error: 'Error creating new category'}));
}

// UPDATE CATEGORY
export const updateCategory = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const { name, description } = req.body;

    knexdb<Categories>('categories').where({ category_id: id  }).update( { name, description } )
    .then(updatedCategory => {
        if(updatedCategory) {
            return knexdb('categories').where({ category_id: id }).first();
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    })
    .then(updatedCategory => res.status(200).json(updatedCategory))
    .catch(error => res.status(500).json({error: 'Error updating category'}));
}

// DELETE CATEGORY
export const deleteCategory = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    knexdb<Categories>('categories').where({ category_id: id }).del()
    .then(deletedCategory => {
        if ( deletedCategory ) {
            res.status(200).json({ message: 'Category deleted successfully'});
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    })
    .catch(error => res.status(500).json({error: 'Error while deleting Category'}));
}

// GET CATEGORIES BY RESTAURANT ID
export const getCategoriesByRestaurantId = (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    knexdb<Categories>('categories').where({ restaurant_id:id })
    .then(categories =>  {
        if(categories.length > 0) {
            res.json(categories);
        } else {
            res.status(404).json({error:'No categories found for this restaurant'});  
        }
    })
    .catch(error => res.status(500).json({error: 'error occured'}));
}