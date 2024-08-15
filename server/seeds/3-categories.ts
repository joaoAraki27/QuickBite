import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("categories").del();

    // Inserts seed entries
    await knex("categories").insert([
        {
            restaurant_id: 1, 
            name: 'Sushi',
            description: 'Fresh and delicious sushi.',
          },
          {
            restaurant_id: 1,
            name: 'Sashimi',
            description: 'Assorted sashimi.',
          },
          {
            restaurant_id: 1,
            name: 'Tempura',
            description: 'Lightly battered and deep-fried seafood and vegetables.',
          },
          {
            restaurant_id: 2,
            name: 'Ramen',
            description: 'Ramen dishes.',
          },
          {
            restaurant_id: 2,
            name: 'Sides',
            description: 'Side dishes.',
          },
          {
            restaurant_id: 2,
            name: 'Donburi',
            description: 'Rice bowls with various toppings.',
          },
        ]);
}