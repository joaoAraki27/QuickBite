import knex from "knex";
import type {Knex}  from "knex";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'senha'; 

import knexConfig from "../../knexfile";

const environment: string = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexConfig[environment];
const knexdb = knex(config);

interface User {
    userId: number,
    email: string
}

//GET ALL USERS
export const getAllUsers = (req: Request, res: Response) => {
    knexdb<User>('users').select('*')
    .then(allUsers => res.json(allUsers))
    .catch(error => res.status(500).json({error: 'error occurred'}));
}

//GET USERS BY ID
export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    knexdb('users').where({ user_id : id  }).first()
    .then(UserID =>  {
        if(UserID) {
            res.json(UserID);
        } else {
            res.status(404).json({error: 'not found'});  
        }
    })
    .catch(error => res.status(404).json({error: 'error occurred'}));
}


//UPDATE USER
export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, phone_number } = req.body;
    knexdb('users').where({ user_id: id  }).update({ name, phone_number })
    .then(updatedUser => {
        if(updatedUser) {
            return knexdb('users').where({ user_id: id }).first();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    })
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(error => res.status(500).json({error: 'Error updating User'}));
}

//DELETE USER
export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    knexdb('users').where({ user_id: id }).del()
    .then(deletedUser => {
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    })
    .catch(error => res.status(500).json({error: 'Error while deleting User'}));
}


//CREATE NEW USER//REGISTER NEW USER
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, phone_number } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await knexdb('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password
        const salt = 10;
        const password_hash= await bcrypt.hash(password, salt);

        // Insert new user into the database
        const [user] = await knexdb('users').insert({
            name,
            email,
            password_hash,
            phone_number
        }).returning('*');

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
}

//LOGIN AUTHENTICATION

export const loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    knexdb('users').where({ email }).first()
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Compare the password and hashed password
            return bcrypt.compare(password, user.password_hash)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ error: 'Invalid email or password' });
                    }

                    //Create a jwt token
                    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '10h' });

                    res.status(200).json({
                        auth: true,
                        token,
                        user: {
                            user_id: user.user_id,
                            name: user.name,
                            email: user.email,
                            phone_number: user.phone_number
                        }
                    });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error logging in' });
        });
}