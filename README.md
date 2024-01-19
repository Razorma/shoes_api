# shoes_api
[![Node.js CI](https://github.com/Razorma/shoes_api/actions/workflows/node.js.yml/badge.svg)](https://github.com/Razorma/shoes_api/actions/workflows/node.js.yml)

# Shoes Catalogue API
A Powerful API, offering seamless management of a dynamic shoe catalog and an intuitive shopping cart system.

## Installation
Follow these steps
  1. Clone this Repo `git clone https://github.com/Razorma/shoes_api.git`
  2. install dependencies `npm install`
  3. Set up your database connection
  4. run `npm start`
## API Endpoints

### For Shoes

Shoes API Endpoints
Routes   | HTTP Method | Description 
---|----|---
`/api/shoes` | GET | Gets all shoes.
`/api/shoes/brand/:brandname` | GET| Gets shoes by brand name.
`/api/shoes/size/:size` | GET | Gets shoes by their sizes.
`/api/shoes/color/:color` | GET |  Gets shoes by their color.
`/api/shoes/brand/:brandname/size/:size` | GET | Gets shoes by brand and size.
`/api/shoes/brand/:brandname/color/:color` | GET | Gets shoes by brand and  color.
`/api/shoes/size/:size/color/:color` | GET| Gets shoes by size and color.
`/api/shoes/brand/:brandname/color/:color/size/:size` | GET | Gets shoes by their sizes brand and color.
`/api/shoes/addUser` | POST |  Adds a user to the database.
`/api/login/` | POST | Log user in.
`/api/logOut/` | POST | Log user out.
`/api/shoes` | POST | Add a shoe.


Cart API Endpoints
Routes   | HTTP Method | Description 
---|----|---
`/api/getCart/username/:username` | GET | Get cart for the user.
`/api/addToCart/username/:username` | POST | Add items to the user's cart.
`/api/shoes/sold/:username` | POST | Checkout user cart.
`/api/shoes/cancelCart` | POST |  Remove shoes from the user's cart.
`/api/shoes/history` | GET | Gets All the shoes bought.
`/api/sizes` | GET | Gets available shoe sizes.
`/api/clearCartHistory` | GET| Clears every shoe bought.

## Database Schema

### Table **Brand**
This table stores available brands.
		
Field   | Type 
---|----
 `id` | serial PRIMARY KEY,
 `brand_name`| VARCHAR(255) NOT NULL UNIQUE

### Table **Sizes**
This table stores available Sizes.
		
Field   | Type 
---|----
`id` | serial PRIMARY KEY
`size` | int NOT NULL UNIQUE

### Table **Shoes**
This table stores available Shoes.
		
Field   | Type 
---|----
`id` | serial PRIMARY KEY
`shoe_name` | VARCHAR(255) NOT NULL,
`shoe_picture` |  VARCHAR(255) NOT NULL
`shoe_color` | VARCHAR(255) NOT NULL
`price` | decimal(10,2),
`stock` | int NOT NULL
`brand_id` | int REFERENCES brand(id) ON DELETE CASCADE
`shoe_size` | int REFERENCES sizes(size) ON DELETE CASCADE

CONSTRAINT unique_shoe_name_shoe_color_shoe_size UNIQUE (shoe_name, shoe_color, shoe_size)

### Table **Users**
This table stores user info.
		
Field   | Type 
---|----
`id` | serial PRIMARY KEY
`username` | varchar(255) NOT NULL
`surname` |  VARCHAR(255) NOT NULL
`email` | varchar(255) NOT NULL UNIQUE
`password` | varchar(255) NOT NULL
`role` | varchar(255) NOT NULL  

### Table **cart**
This table stores user purchase history.
		
Field   | Type 
---|----
`id` | serial PRIMARY KEY
`user_id` | int REFERENCES users(id) ON DELETE CASCADE
`shoe_id` | int REFERENCES shoes(id) ON DELETE CASCADE
`QTY` | int
`amount` | decimal(10,2) NOT NULL
`bought` | BOOLEAN DEFAULT false  

CREATE UNIQUE INDEX cart_shoe_id_unique ON cart (shoe_id,user_id) WHERE bought = false;

