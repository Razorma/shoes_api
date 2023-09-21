CREATE TABLE IF NOT EXISTS brand (
    id serial PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS sizes (
    id serial PRIMARY KEY,
    size int NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS shoes (
    id serial PRIMARY KEY,
    shoe_name VARCHAR(255) NOT NULL,
    shoe_picture VARCHAR(255) NOT NULL,
    shoe_color VARCHAR(255) NOT NULL,
    price decimal(10,2),
    stock int NOT NULL,
    brand_id int REFERENCES brand(id) ON DELETE CASCADE,
    shoe_size int REFERENCES sizes(size) ON DELETE CASCADE,
    CONSTRAINT unique_shoe_name_shoe_color_shoe_size UNIQUE (shoe_name, shoe_color, shoe_size)
);


CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
    id serial PRIMARY KEY,
    user_id int REFERENCES users(id) ON DELETE CASCADE,
    shoe_id int REFERENCES shoes(id) ON DELETE CASCADE UNIQUE,
    QTY int,
    amount decimal(10,2) NOT NULL,
    bought BOOLEAN DEFAULT false
);

INSERT INTO brand (brand_name) VALUES
    ('nike'),
    ('adidas'),
    ('puma'),
    ('vans'),
    ('allStar'),
    ('fila');

INSERT INTO sizes (size) VALUES
    (5),
    (6),
    (7);
