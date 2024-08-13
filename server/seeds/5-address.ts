import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('address').del();

    // Inserts seed entries
    await knex('address').insert([
        {
            user_id: 1, 
            address: '1-1-1 Shibuya',
            city: 'Shibuya',
            prefectures: 'Tokyo',
            postal_code: '150-0002',
          },
          {
            user_id: 2,
            address: '2-2-2 Minato',
            city: 'Minato',
            prefectures: 'Tokyo',
            postal_code: '105-0001',
          },
    ]);
};
