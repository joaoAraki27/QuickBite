import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("menu_items").del();

    // Inserts seed entries
    await knex("menu_items").insert([
        {
            category_id: 1,
            name: 'California Roll',
            description: 'Roll with crab, avocado, and cucumber.',
            price: 1200,
            image_url: 'https://cdn.britannica.com/52/128652-050-14AD19CA/Maki-zushi.jpg',
          },
          {
            category_id: 2,
            name: 'Tuna Sashimi',
            description: 'Fresh tuna sashimi slices.',
            price: 1500,
            image_url: 'https://ocwildseafood.com/cdn/shop/articles/Ahi_Tuna_Sashimi_Seafood_Recipe_1024x.jpg?v=1591853624',
          },
          {
            category_id: 3,
            name: 'Shoyu Ramen',
            description: 'Classic soy sauce ramen.',
            price: 1000,
            image_url: 'https://www.justonecookbook.com/wp-content/uploads/2023/04/Shoyu-Ramen-8308-I.jpg',
          },
          {
            category_id: 4,
            name: 'Gyoza',
            description: 'Japanese dumplings.',
            price: 600,
            image_url: 'https://assets.epicurious.com/photos/628ba0d3fa016bab2139efa2/1:1/w_4546,h_4546,c_limit/Gyoza_RECIPE_051922_34332.jpg',
          },
        ]);
};
