import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('address', (table) => {
        table.increments('address_id').primary(); 
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE').notNullable(); 
        table.string('address').notNullable();
        table.string('city').notNullable(); 
        table.string('prefectures').notNullable();
        table.string('postal_code').notNullable(); 
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('addresses');
}

