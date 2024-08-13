import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('categories', (table) => {
        table.increments('category_id').primary();
        table.integer('restaurant_id').unsigned().references('restaurant_id').inTable('restaurants').onDelete('CASCADE');
        table.string('name').notNullable();
        table.text('description');
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('categories');
}

