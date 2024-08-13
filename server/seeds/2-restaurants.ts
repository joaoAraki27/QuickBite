import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("restaurants").del();

    // Inserts seed entries
    await knex("restaurants").insert([
        {
            name: 'Sakura Sushi',
            logo_url: 'https://png.pngtree.com/png-vector/20221225/ourmid/pngtree-the-cute-cat-and-ramen-logo-illustration-design-png-image_6536468.png',
            phone_number: '03-1234-5678',
            line_id: 'sakura_sushi_shop',
            address: 'Roppongi, Minato-ku',
            owner_id: 1, 
          },
          {
            name: 'Mr.Ramen Shop',
            logo_url: 'https://png.pngtree.com/png-vector/20221219/ourmid/pngtree-sushi-food-rice-bowl-fish-logo-template-for-your-brand-with-png-image_6525810.png',
            phone_number: '03-8765-4321',
            line_id: 'mr.ramen_shop',
            address: 'Shibuya, Shibuya-ku',
            owner_id: 2, 
          },
        ]);
};
