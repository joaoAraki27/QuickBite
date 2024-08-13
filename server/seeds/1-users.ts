import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const passwordHash = await bcrypt.hash('password', 10); // Hashing


    // Inserts seed entries
    await knex("users").insert([
        {
            name: 'user',
            email: 'user@gmail.com',
            password_hash: passwordHash,
            phone_number: '080-1234-5678',
          },
          {
            name: 'admin',
            email: 'admin@gmail.com',
            password_hash: passwordHash,
            phone_number: '080-8765-4321',
          },
        ]);
};
