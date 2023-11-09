//import bcrypt
import bcrypt from "bcrypt";

//Define and export database function
export default function ShoeService(db) {

    //add user so database function
    async function addUsername(username, password, surname, email, role) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const addUserQuery = `
        INSERT INTO users (username, password,surname,email,role)
                VALUES ($1, $2,$3,$4,$5);
         `;
        await db.none(addUserQuery, [username, hashedPassword, surname, email, role])
    }

    //Define a function where a user can log in and the name of the user will be kept on the initialise username 
    async function login(email, enteredPassword) {
        

    //check if user exists
        const checkUsernameQuery = `
                SELECT * FROM users WHERE email = $1;
                `;
        const [result] = await db.query(checkUsernameQuery, [email]);


        if (!result) {
            throw new Error("Username not found");
        }
        const storedPassword = result.password;
        const role = result.role;
        const user_id = result.user_id;
        const name= result.username;
        



        //Check if the password matches
        const passwordMatch = await bcrypt.compare(enteredPassword, storedPassword)

        //Return role if password is correct and throw error if they dont match
        if (passwordMatch) {
            return {
                role,
                name:name,
                user_id
            };
        } else {
            throw new Error("Incorrect password");
        }

    }
    

    //Define a function where he admin can add a shoe to the stock
    async function addShoe(shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size) {
        const replaceStockStockShoeQuery = `
        INSERT INTO shoes (shoe_name,shoe_picture,shoe_color,price,stock,brand_id,shoe_size)
        VALUES($1,$2,$3,$4,$5,$6,$7)
         `;
        await db.none(replaceStockStockShoeQuery, [shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size])
    }

    //Define a function where a user can get all the available shoes in storage
    async function getAllShoe() {
        const results = await db.many(`SELECT s.id,s.shoe_name,
        s.shoe_picture,s.shoe_color,s.price,s.stock,s.shoe_size,b.brand_name 
        FROM shoes s
        JOIN brand b ON s.brand_id = b.id
        WHERE s.stock > 0
        ORDER BY s.id ASC;
        `)

        return results
    }
    //Define a function that will get all available sizes
    async function getAvailableShoeSizes(name,brandname,color) {
        const getShoeByBrandQuery = `
            SELECT id 
            FROM brand
            WHERE brand_name = $1;
            `;
        const brandId = await db.one(getShoeByBrandQuery, [brandname]);
        const id = brandId.id

        const results = await db.many(
            `SELECT s.id, s.shoe_name, s.shoe_picture, s.shoe_color, s.price, s.stock, s.shoe_size, b.brand_name
            FROM shoes s
            JOIN brand b ON s.brand_id = b.id
            WHERE brand_id = $1 AND shoe_name = $2 AND shoe_color LIKE $3;
            `, [id, name, `%${color}%`]);
        
        let availableSizes = []
        results.forEach(shoe => {
            availableSizes.push(shoe.shoe_size)

        });
        return availableSizes;  

    }
    //define a function that will get shoes by their brands
    async function getShoeByBrand(brandname) {

    //get the shoe brand id
        const getShoeByBrandQuery = `
            SELECT id 
            FROM brand
            WHERE brand_name = $1;
            `;
        const brandId = await db.one(getShoeByBrandQuery, [brandname]);
        const id = brandId.id

        const results = await db.many(
            `SELECT s.id,s.shoe_name,
                s.shoe_picture,s.shoe_color,s.price,s.stock,s.shoe_size,b.brand_name
                FROM shoes s
                JOIN brand b ON s.brand_id = b.id
                WHERE brand_id = $1
                ORDER BY s.id ASC;
                `, [id])
        return results

    }

    // define a function that will get the shoes by their sizes
    async function getShoeBySize(size) {

        const results = await db.many(
            `SELECT s.id,s.shoe_name,
            s.shoe_picture,s.shoe_color,s.price,s.stock,s.shoe_size,b.brand_name
            FROM shoes s
            JOIN brand b ON s.brand_id = b.id
            WHERE shoe_size = $1
            ORDER BY s.id ASC;
            `, [size])

        return results

    }

    //Define a function that will get all the shoes of a specific color
    async function getShoeByColor(color) {

        const results = await db.many(
            `SELECT s.id, s.shoe_name, s.shoe_picture, s.shoe_color, s.price, s.stock, s.shoe_size, b.brand_name
            FROM shoes s
            JOIN brand b ON s.brand_id = b.id
            WHERE shoe_color LIKE $1
            ORDER BY s.id ASC;
            `, [`%${color}%`]);
        
        return results;
    
    }

    //Define a function that wil get the shoes by their brands and sizes
    async function getShoeByBrandAndSize(brandname, size) {

        //Get the id of the brand
        const getShoeByBrandQuery = `
        SELECT id 
        FROM brand
        WHERE brand_name = $1;
        `;
        const brandId = await db.one(getShoeByBrandQuery, [brandname]);
        const id = brandId.id

        const results = await db.many(
            `SELECT s.id,s.shoe_name,
            s.shoe_picture,s.shoe_color,s.price,s.stock,s.shoe_size,b.brand_name
            FROM shoes s
            JOIN brand b ON s.brand_id = b.id
            WHERE brand_id = $1 AND shoe_size = $2
            ORDER BY s.id ASC;
            `, [id, size])

        return results

    }

    //Define a function that will get shoes by brand and color
    async function getShoeByBrandAndColor(brandname, color) {
        const getShoeByBrandQuery = `
        SELECT id 
        FROM brand
        WHERE brand_name = $1;
        `;
        const brandId = await db.one(getShoeByBrandQuery, [brandname]);
        const id = brandId.id

        const results = await db.many(
            `SELECT s.id,s.shoe_name,
            s.shoe_picture,s.shoe_color,s.price,s.stock,s.shoe_size,b.brand_name
            FROM shoes s
            JOIN brand b ON s.brand_id = b.id
            WHERE brand_id =$1 AND shoe_color LIKE $2
            ORDER BY s.id ASC;
            `, [id, `%${color}%`])

        return results

    }

    //Define a function that will get shoes by size and color
    async function getShoeBySizeAndColor(size, color) {

        const results = await db.many(
            `SELECT s.id,s.shoe_name,
            s.shoe_picture,s.shoe_color,s.price,s.stock,s.shoe_size,b.brand_name
            FROM shoes s
            JOIN brand b ON s.brand_id = b.id
            WHERE shoe_size = $1 AND shoe_color LIKE $2
            ORDER BY s.id ASC;
            `, [size, `%${color}%`])

        return results

    }

    //Define a function that will get a shoe by their brand color and size
    async function getShoeBySizeAndColorAndBrand(brandname,size, color) {

        //get the id of the brand from the brand table
        const getShoeByBrandQuery = `
        SELECT id 
        FROM brand
        WHERE brand_name = $1;
        `;
        const brandId = await db.one(getShoeByBrandQuery, [brandname]);
        const id = brandId.id

        const results = await db.many(
            `SELECT s.id,s.shoe_name,
            s.shoe_picture,s.shoe_color,s.price,s.stock,s.shoe_size,b.brand_name
            FROM shoes s
            JOIN brand b ON s.brand_id = b.id
            WHERE shoe_size = $1 AND shoe_color LIKE $2 AND brand_id = $3
            ORDER BY s.id ASC;
            `, [size, `%${color}%`,id])

        return results

    }

   //Define a function that will remove a shoe from the cart
    async function replaceStock(username,shoe_id, qty) {

        //A query that will get the id of the current user
        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        const userId = await db.one(getuserIdQuery, [username])

        //A query that will get the price of the shoe
        const getpriceQuery = `
        SELECT price
        FROM shoes
        WHERE id = $1;
        `;

        const shoePrice = await db.one(getpriceQuery, [shoe_id])


        //A query that will update the cart and reflect the shoe that was just removed
        const updateQtyCartQuery = `
        UPDATE cart
        SET qty = qty-$1
        WHERE shoe_id = $2 AND bought = false;  
        `;

        await db.none(updateQtyCartQuery, [qty, shoe_id]);


        //A query that will get the price of the shoes left in cart
        const updatePriceCartQuery = `
        UPDATE cart
        SET amount = ($1*cart.QTY)
        WHERE shoe_id = $2 AND bought = false;  
        `;

        await db.none(updatePriceCartQuery, [parseFloat(shoePrice.price), shoe_id]);

        //A query that will remove the shoe from cart

        const removeShoe = `
            SELECT qty
            FROM cart
            WHERE user_id  = $1 AND shoe_id = $2 AND bought = false; 
            `;

        const quantity = await db.one(removeShoe, [userId.id, shoe_id]);

        if (quantity.qty < 1) {
            await db.none(`DELETE FROM cart WHERE user_id = $1 AND shoe_id = $2 AND bought = false;`, [userId.id, shoe_id]);
        }

        const replaceStockShoeQuery = `
        UPDATE shoes
        SET stock = stock + $1
        WHERE id = $2;  
        `;

        await db.none(replaceStockShoeQuery, [qty, shoe_id]);


    }


    //Define a function that will add a shoe to the cart
    async function addShoeToCart(username,shoe_id) {

        //A query that will get the id of the user from the user table
        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        const userId = await db.one(getuserIdQuery, [username])


        //a query that will get the price of the shoe
        const getpriceQuery = `
        SELECT price
        FROM shoes
        WHERE id = $1;
        `;

        const shoePrice = await db.one(getpriceQuery, [shoe_id])

        const getStockQuery = `
        SELECT stock,shoe_name
        FROM shoes
        WHERE id = $1;
        `;

        const shoeStock = await db.one(getStockQuery, [shoe_id])

        //if the stock shoe is out of stock throw and error
        if (shoeStock.stock === 0) {
            throw new Error(`${shoeStock.shoe_name} is out of Stock`);

        } else {

            //if not add the shoe to the cart and if it is the same shoe increment the quantity of the shoe
            const addShoeToCartQuery = `
                INSERT INTO cart (user_id, shoe_id, QTY, amount)
                VALUES ($1, $2, 1, $3)
                ON CONFLICT (shoe_id, user_id) 
                WHERE bought = false 
                DO UPDATE
                SET QTY = cart.QTY + 1;
            `;

            const result = await db.oneOrNone(addShoeToCartQuery, [userId.id, shoe_id, parseFloat(shoePrice.price)]);


            //decreate the stock of the shoe in storage
            const decreaseStockShoeQuery = `
            UPDATE shoes
            SET stock = stock - 1
            WHERE id = $1 ; 
            `;
            await db.none(decreaseStockShoeQuery, [shoe_id]);



            
           // update the price of the shoe in the cart
            const updatePriceCartQuery = `
            UPDATE cart
            SET amount = ($1*cart.QTY)
            WHERE shoe_id = $2 AND bought = false;  
            `;

            await db.none(updatePriceCartQuery, [parseFloat(shoePrice.price), shoe_id]);

        }

    }
    //Define a function so get the cart of the current user
    async function getCart(username) {

        //A query to get the current user id
        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        let userId = await db.one(getuserIdQuery, [username])


        const getCartQuery = `
        SELECT c.user_id, c.shoe_id,c.QTY, c.amount, c.bought,
        s.shoe_name, s.shoe_picture, s.shoe_color, s.price, s.stock, b.brand_name, s.shoe_size
        FROM cart c
        JOIN shoes s ON c.shoe_id = s.id
        JOIN brand b ON s.brand_id = b.id
        WHERE c.user_id = $1 And bought = false
        ORDER BY c.shoe_id ASC;
         `;

        //get the number of items ass well as the total of the items in the cart
        let total = 0;
        let cartItems = 0;
        const results = await db.manyOrNone(getCartQuery, [userId.id])
        results.forEach(shoe => {
            total += parseFloat(shoe.amount)
            cartItems += parseFloat(shoe.qty)
        });

        return {
            results,
            total: total.toFixed(2),
            cartItems: cartItems
        }
    }
    //define a function to get the history of a particular user
    async function getPurchaseHistory(username) {
        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        let userId = await db.one(getuserIdQuery, [username])


        const getCartQuery = `
        SELECT c.user_id, c.shoe_id,c.QTY, c.amount, c.bought,
        s.shoe_name, s.shoe_picture, s.shoe_color, s.price, s.stock, b.brand_name, s.shoe_size
        FROM cart c
        JOIN shoes s ON c.shoe_id = s.id
        JOIN brand b ON s.brand_id = b.id
        WHERE c.user_id = $1 And bought = true
        ORDER BY c.shoe_id ASC;
         `;
        let total = 0;
        let cartItems = 0;
        const results = await db.manyOrNone(getCartQuery, [userId.id])
        results.forEach(shoe => {
            total += parseFloat(shoe.amount)
            cartItems += parseFloat(shoe.qty)
        });

        return {
            results,
            total: total.toFixed(2),
            cartItems: cartItems
        }
    }

    //define a function to get the history of all users who ordered
    async function getOrders() {
        const getCartQuery = `
        SELECT c.user_id, c.shoe_id,c.QTY, c.amount, c.bought,
        s.shoe_name, s.shoe_picture, s.shoe_color, s.price, b.brand_name, s.shoe_size,u.username
        FROM cart c
        JOIN shoes s ON c.shoe_id = s.id
        JOIN brand b ON s.brand_id = b.id
        JOIN users u ON c.user_id = u.id
        WHERE bought = true
        ORDER BY c.shoe_id ASC;
         `;

        const results = await db.manyOrNone(getCartQuery)

        const data = results;

        const groupedData = data.reduce((acc, item) => {
            const { username, amount, qty } = item;
            
            // Check if the username already exists in the accumulator
            const existingUser = acc.find((user) => user.username === username);

            if (existingUser) {
                // If the user exists, update the total, number of items, and results
                existingUser.total += parseFloat(amount);
                existingUser.numItems += qty;
                existingUser.results.push(item);
            } else {
                // If the user doesn't exist, add a new entry
                acc.push({
                    username,
                    total: parseFloat(amount),
                    numItems: qty,
                    results: [item],
                });
            }

            return acc;
        }, []);

        // Calculate the overall total and cartItems
        const overallTotal = groupedData.reduce((total, user) => total + user.total, 0);
        const overallNumItems = groupedData.reduce((numItems, user) => numItems + user.numItems, 0);


        return {
            results: groupedData,
            total: overallTotal.toFixed(2),
            cartItems: overallNumItems,
        }
    }



    //Define a function that will help a user checkout from the cart
    async function checkoutCart(username) {

        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        let userId = await db.one(getuserIdQuery, [username])



        const updateBuyStatusQuery = `
        UPDATE cart
        SET bought = true
        WHERE user_id = $1 AND bought = false;  
         `;


        await db.manyOrNone(updateBuyStatusQuery, [userId.id])

    }
    //define a function for the admin to clear out all oders of all users
    async function adminClearCartHistory() {
        const clearFromCartQuery = `DELETE FROM cart WHERE bought = true; `;
        await db.none(clearFromCartQuery)

    }

    return {
        getAllShoe,
        login,
        replaceStock,
        addShoe,
        addShoeToCart,
        getCart,
        addUsername,
        checkoutCart,
        getShoeByBrand,
        getShoeBySize,
        getShoeByBrandAndSize,
        getPurchaseHistory,
        getOrders,
        getShoeByColor,
        getShoeByBrandAndColor,
        getShoeBySizeAndColor,
        getShoeBySizeAndColorAndBrand,
        getAvailableShoeSizes,
        adminClearCartHistory
    }
}


//populate the shoes table

// id | brand_name
// ----+------------
//   1 | nike
//   2 | adidas
//   3 | puma
//   4 | vans
//   5 | allStar
//   6 | fila

// id | size
// ----+------
//   1 |    5
//   2 |    6
//   3 |    7


// try {
// await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,5)
// await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,6)
// await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,7)

// await addShoe("adidas Originals Forum Exhibit Mid 2 Sneaker.jpeg","Photos/adidas Originals Men's Forum Exhibit Mid 2 NavyOrGreen SneakerR229995.jpeg","green",2299.95,11,2,6)
// await addShoe("adidas Originals Forum Exhibit Mid 2 Sneaker.jpeg","Photos/adidas Originals Men's Forum Exhibit Mid 2 NavyOrGreen SneakerR229995.jpeg","green",2299.95,14,2,7)

// await addShoe("Adidas Originals Forum Low Grey","Photos/adidas Originals Men's Forum Low Grey SneakerR134900.jpeg","grey",1349.00,14,2,5)
// await addShoe("Adidas Originals Forum Low Grey","Photos/adidas Originals Men's Forum Low Grey SneakerR134900.jpeg","grey",1349.00,14,2,6)

// await addShoe("Nike AirForce","Photos/NikeManAirForce!R2199.95.jpeg","white",2199.95,11,1,5)
// await addShoe("Nike AirForce","Photos/NikeManAirForce!R2199.95.jpeg","white",2199.95,15,1,6)

// await addShoe("Nike Dunk Low","Photos/nikemen'sdunklowR2399.95.jpeg","black",2399.95,17,1,5)
// await addShoe("Nike Dunk Low","Photos/nikemen'sdunklowR2399.95.jpeg","black",2399.95,14,1,7)


// await addShoe("Adidas Originals Multix","Photos/adidas Originals Men's Multix Black SneakerR1099.95.jpeg","black",1099.95,12,2,6)
// await addShoe("Adidas Originals Multix","Photos/adidas Originals Men's Multix Black SneakerR1099.95.jpeg","black",1099.95,13,2,7)


// await addShoe("Nike Court Legacy Lift Natural","Photos/NikewomanCourtLegacyLiftNaturalR1699.95.jpeg","white",1699.95,14,1,6)
// await addShoe("Nike Court Legacy Lift Natural","Photos/NikewomanCourtLegacyLiftNaturalR1699.95.jpeg","white",1699.95,14,1,7)

// await addShoe("Adidas Originals NMD_V3","Photos/adidas Originals Men's NMD_V3 Black SneakerR1979.00.jpeg","black",1979.00,19,2,5)
// await addShoe("Adidas Originals NMD_V3","Photos/adidas Originals Men's NMD_V3 Black SneakerR1979.00.jpeg","blackandwhite",1979.00,21,2,5)

// await addShoe("Adidas Originals Stan Smith","Photos/adidas Originals Men's Stan Smith White SneakerR1499.95.jpeg","white",1499.95,19,2,6)
// await addShoe("Adidas Originals Stan Smith","Photos/adidas Originals Men's Stan Smith White SneakerR1499.95.jpeg","white",1499.95,21,2,5)

// await addShoe("Nike Women AirForce 1","Photos/NikeWomenAirForce1White.jpeg","white",2650.00,4,1,6)
// await addShoe("Nike Women AirForce 1","Photos/NikeWomenAirForce1White.jpeg","white",2650.00,2,1,7)

// await addShoe("Vans Men's Old Skool","Photos/Vans Men's Old Skool BlackORWhite SneakerR949.95.jpeg","black",949.95,21,4,5)
// await addShoe("Vans Men's Old Skool","Photos/Vans Men's Old Skool BlackORWhite SneakerR949.95.jpeg","black",949.95,13,4,5)


// await addShoe("Puma Rickie","Photos/Men's Puma Rickie Whiteor Black R999.95.jpeg","white",999.95,15,3,6)
// await addShoe("Puma Rickie","Photos/Men's Puma Rickie Whiteor Black R999.95.jpeg","white",999.95,9,3,7)


// await addShoe("Vans Men's Old Skool","Photos/Vans Men's Old Skool Tan SneakerBrownR999.95.jpeg","brown",999.95,9,4,6)
// await addShoe("Vans Men's Old Skool","Photos/Vans Men's Old Skool Tan SneakerBrownR999.95.jpeg","brown",999.95,8,4,7)

// await addShoe("Puma Diesier","Photos/PumaMen'sDiesiertoGreyBootR1899.95.jpeg","grey",1899.95,17,3,6)
// await addShoe("Puma Diesier","Photos/PumaMen'sDiesiertoGreyBootR1899.95.jpeg","grey",1899.95,19,3,5)


// await addShoe("Vans Sk8-Hi","Photos/Vans Men's Sk8-Hi White SneakerR899.95.jpeg","white",899.95,17,4,6)
// await addShoe("Vans Sk8-Hi","Photos/Vans Men's Sk8-Hi White SneakerR899.95.jpeg","white",899.95,17,4,5)


// await addShoe("Puma Rider FV Base","Photos/PumaMensRiderFVBaseGreyR1899.95.jpeg","grey",1899.95,17,3,6)
// await addShoe("Puma Rider FV Base","Photos/PumaMensRiderFVBaseGreyR1899.95.jpeg","grey",1899.95,19,3,7)


// await addShoe("Puma Mayze Crash Prm","Photos/pumaWomenMayzeCrashPrmWHiteOrBlackR1899.95.jpeg","white",1899.95,11,3,6)
// await addShoe("Puma Mayze Crash Prm","Photos/pumaWomenMayzeCrashPrmWHiteOrBlackR1899.95.jpeg","white",1899.95,13,3,7)

// await addShoe("Vans Checkerboard Sentry SK8-Hi","Photos/Vans Women's Checkerboard Sentry SK8-Hi BlackORWhite SneakerR15599.95.jpeg","white",999.00,11,4,6)
// await addShoe("Vans Checkerboard Sentry SK8-Hi","Photos/Vans Women's Checkerboard Sentry SK8-Hi BlackORWhite SneakerR15599.95.jpeg","white",999.00,13,4,5)


// await addShoe("Vans Sk8-Hi","Photos/Vans Women's Old Skool Platform Poppy Checkerboard SneakerR1149.00.jpeg","white",899.95,10,4,5)
// await addShoe("Vans Sk8-Hi","Photos/Vans Women's Old Skool Platform Poppy Checkerboard SneakerR1149.00.jpeg","white",899.95,6,4,7)


// await addShoe("Puma Carina 2.0 Bold Warm","Photos/WomenPumaCarina2.0BoldWarmWhiteR1199.5.jpeg","white",1199.5,8,3,6)
// await addShoe("Puma Carina 2.0 Bold Warm","Photos/WomenPumaCarina2.0BoldWarmWhiteR1199.5.jpeg","white",1199.5,2,3,7)


// } catch (error) {
//     console.log("error "+error.message)
// }