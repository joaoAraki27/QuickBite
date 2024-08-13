import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('restaurants', (table) => {
        table.increments('restaurant_id').primary();
        table.string('name').notNullable();
        table.string('logo_url');
        table.string('phone_number');
        table.string('line_id');
        table.string('address');
        table.integer('owner_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('restaurants');
}

