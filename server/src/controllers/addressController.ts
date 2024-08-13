import knex from "knex";
import type { Knex } from "knex";
import type { Request, Response } from "express";

import knexConfig from "../../knexfile";

const environment: string = process.env.NODE_ENV || "development";
const config: Knex.Config = knexConfig[environment];
const knexdb = knex(config);

interface Address {
  address_id: number;
  user_id: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
}

// GET ALL ADDRESSES
export const getAllAddresses = (req: Request, res: Response) => {
  knexdb<Address>("address")
    .select("*")
    .then((allAddresses) => res.json(allAddresses))
    .catch((error) => res.status(500).json({ error: "Error occurred while fetching addresses" }));
};

// GET ADDRESS BY ID
export const getAddressById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  knexdb<Address>("addresses")
    .where({ address_id: id })
    .first()
    .then((address) => {
      if (address) {
        res.json(address);
      } else {
        res.status(404).json({ error: "Address not found" });
      }
    })
    .catch((error) => res.status(500).json({ error: "Error occurred while fetching address" }));
};

// CREATE NEW ADDRESS
export const createAddress = (req: Request, res: Response) => {
  const { user_id, address, city, state, postal_code } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  knexdb<Address>("address")
    .insert(req.body)
    .returning("*")
    .then((newAddress) => res.status(201).json(newAddress))
    .catch((error) => res.status(500).json({ error: "Error creating new address" }));
};

// UPDATE ADDRESS
export const updateAddress = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const { address, city, state, postal_code } = req.body;

  knexdb<Address>("address")
    .where({ address_id: id })
    .update({ address, city, state, postal_code })
    .then((updatedAddress) => {
      if (updatedAddress) {
        return knexdb<Address>("address").where({ address_id: id }).first();
      } else {
        res.status(404).json({ error: "Address not found" });
      }
    })
    .then((updatedAddress) => res.status(200).json(updatedAddress))
    .catch((error) => res.status(500).json({ error: "Error updating address" }));
};

// DELETE ADDRESS
export const deleteAddress = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  knexdb<Address>("address")
    .where({ address_id: id })
    .delete()
    .then((deletedAddress) => {
      if (deletedAddress) {
        res.status(200).json({ message: "Address deleted successfully" });
      } else {
        res.status(404).json({ error: "Address not found" });
      }
    })
    .catch((error) => res.status(500).json({ error: "Error deleting address" }));
};

// GET ADDRESSES BY USER ID
export const getAddressesByUserId = (req: Request, res: Response) => {
  const user_id: number = parseInt(req.params.user_id);

  knexdb<Address>("address")
    .where({ user_id })
    .then((addresses) => {
      if (addresses.length > 0) {
        res.json(addresses);
      } else {
        res.status(404).json({ error: "No addresses found for this user" });
      }
    })
    .catch((error) => res.status(500).json({ error: "Error occurred while fetching addresses" }));
};