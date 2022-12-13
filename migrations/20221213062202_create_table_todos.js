/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("todos", (table) => {
    table.string("id", 36).notNullable().primary();
    table.string("name", 255).notNullable();
    table.boolean("is_completed").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("todos");
};
