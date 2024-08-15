import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("menu_items").del();

    // Inserts seed entries
    await knex("menu_items").insert([
      {
        category_id: 1,
        restaurant_id: 1,
        name: 'California Roll',
        category_name: 'Sushi',
        description: 'Roll with crab, avocado, and cucumber',
        price: 1200,
        image_url: 'https://cdn.britannica.com/52/128652-050-14AD19CA/Maki-zushi.jpg',
      },
      {
        category_id: 2,
        restaurant_id: 1,
        name: 'Tuna Sashimi',
        category_name: 'Sashimi',
        description: 'Fresh tuna sashimi slices',
        price: 1500,
        image_url: 'https://ocwildseafood.com/cdn/shop/articles/Ahi_Tuna_Sashimi_Seafood_Recipe_1024x.jpg?v=1591853624',
      },
      {
        category_id: 3,
        restaurant_id: 1,
        name: 'Shrimp Tempura',
        category_name: 'Tempura',
        description: 'Crispy deep-fried shrimp',
        price: 800,
        image_url: 'https://res.cloudinary.com/hksqkdlah/image/upload/SFS_CrispyFriedShrimp-80_fdh2ne.jpg',
      },
      {
        category_id: 3,
        restaurant_id: 1,
        name: 'Vegetable Tempura',
        category_name: 'Tempura',
        description: 'tempura vegetables',
        price: 700,
        image_url: 'https://static01.nyt.com/images/2013/10/23/dining/23JPFLEX1/23JPFLEX1-superJumbo.jpg',
      },
      {
        category_id: 4,
        restaurant_id: 2,
        name: 'Shoyu Ramen',
        category_name: 'Ramen',
        description: 'Classic soy sauce ramen',
        price: 1000,
        image_url: 'https://www.justonecookbook.com/wp-content/uploads/2023/04/Spicy-Shoyu-Ramen-8055-I.jpg',
      },
      {
        category_id: 5,
        restaurant_id: 2,
        name: 'Gyoza',
        category_name: 'Sides',
        description: 'Japanese Gyoza',
        price: 600,
        image_url: 'https://assets.epicurious.com/photos/628ba0d3fa016bab2139efa2/1:1/w_4546,h_4546,c_limit/Gyoza_RECIPE_051922_34332.jpg',
      },
      {
        category_id: 6,
        restaurant_id: 2,
        name: 'gyudon',
        category_name: 'Donburi',
        description: 'Rice bowl with beef and onions',
        price: 1000,
        image_url: 'https://ryukoch.com/images/food-blog/gyudon-t.jpg',
      },
      {
        category_id: 6,
        restaurant_id: 2,
        name: 'Oyakodon',
        category_name: 'Donburi',
        description: 'Rice bowl with chicken and vegetables',
        price: 950,
        image_url: 'https://japanesetaste.com/cdn/shop/articles/how-to-make-oyakodon-chicken-and-egg-rice-bowl-at-home-japanese-taste.jpg?v=1694486973&width=5760',
      },
    ]);
}