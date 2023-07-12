-- Create the schema
CREATE SCHEMA IF NOT EXISTS cgp;

-- Create the table
CREATE TABLE IF NOT EXISTS cgp.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    name VARCHAR(255)
);
