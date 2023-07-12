-- Create the database
CREATE DATABASE cgp_db;

-- Create the schema
CREATE SCHEMA cgp;

-- Create the table
CREATE TABLE cgp.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    name VARCHAR(255)
);
