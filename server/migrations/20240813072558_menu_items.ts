import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('menu_items', (table) => {
        table.increments('item_id').primary();
        table.integer('category_id').unsigned().references('category_id').inTable('categories').onDelete('CASCADE');
        table.string('name').notNullable();
        table.text('description');
        table.decimal('price', 10, 2).notNullable();
        table.string('image_url');
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('menu_items');
}

