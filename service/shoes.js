export default  function ShoeService(db) {
    async function addUsername(username, password, surname, email) {
        const addShoeToCartQuery = `
        INSERT INTO users (username, password,surname,email)
                VALUES ($1, $2,$3,$4);
         `;
        await db.none(addShoeToCartQuery, [username, password, surname, email])
    }

    async function addShoe(shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size) {
        const replaceStockStockShoeQuery = `
        INSERT INTO shoes (shoe_name,shoe_picture,shoe_color,price,stock,brand_id,shoe_size)
        VALUES($1,$2,$3,$4,$5,$6,$7)
         `;
        await db.none(replaceStockStockShoeQuery, [shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size])
    }


    //  try {
    //     // await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,5)
    //     await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,6)
    //     await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,7)
    
    //     //  await addShoe("adidas Originals Forum Exhibit Mid 2","Photos/adidas Originals Men's Forum Exhibit Mid 2 NavyOrGreen SneakerR229995.jpeg","green",2299.95,11,2,6)
    //      await addShoe("adidas Originals Forum Exhibit Mid 2","Photos/adidas Originals Men's Forum Exhibit Mid 2 NavyOrGreen SneakerR229995.jpeg","green",2299.95,14,2,7)
        
    //     // await addShoe("Adidas Originals Forum Low", "Photos/adidas Originals Men's Forum Low Grey SneakerR134900.jpeg", "white", 1349.00, 14, 2, 5)
    //     await addShoe("Adidas Originals Forum Low", "Photos/adidas Originals Men's Forum Low Grey SneakerR134900.jpeg", "white", 1349.00, 14, 2, 6)

    //     // await addShoe("Nike AirForce", "Photos/NikeManAirForce!R2199.95.jpeg", "white", 2199.95, 11, 1, 5)
    //     await addShoe("Nike AirForce", "Photos/NikeManAirForce!R2199.95.jpeg", "white", 2199.95, 15, 1, 6)

    //     // await addShoe("Nike Dunk Low","Photos/nikemen'sdunklowR2399.95.jpeg","black",2399.95,17,1,5)
    //     await addShoe("Nike Dunk Low","Photos/nikemen'sdunklowR2399.95.jpeg","black",2399.95,14,1,7)
    
    
    //     // await addShoe("Adidas Originals Multix","Photos/adidas Originals Men's Multix Black SneakerR1099.95.jpeg","black",1099.95,12,2,6)
    //     await addShoe("Adidas Originals Multix","Photos/adidas Originals Men's Multix Black SneakerR1099.95.jpeg","black",1099.95,13,2,7)
        
    //     // await addShoe("Nike Court Legacy Lift Natural", "Photos/NikewomanCourtLegacyLiftNaturalR1699.95.jpeg", "white", 1699.95, 14, 1, 6)
    //     await addShoe("Nike Court Legacy Lift Natural", "Photos/NikewomanCourtLegacyLiftNaturalR1699.95.jpeg", "white", 1699.95, 14, 1, 7)

    //     // await addShoe("Adidas Originals NMD_V3", "Photos/adidas Originals Men's NMD_V3 Black SneakerR1979.00.jpeg", "black", 1979.00, 19, 2, 5)
    //     await addShoe("Adidas Originals NMD_V3", "Photos/adidas Originals Men's NMD_V3 Black SneakerR1979.00.jpeg", "blackandwhite", 1979.00, 21, 2, 5)

    //     // await addShoe("Adidas Originals Stan Smith", "Photos/adidas Originals Men's Stan Smith White SneakerR1499.95.jpeg", "white", 1499.95, 19, 2, 6)
    //     await addShoe("Adidas Originals Stan Smith", "Photos/adidas Originals Men's Stan Smith White SneakerR1499.95.jpeg", "white", 1499.95, 21, 2, 5)

    //     // await addShoe("Nike Women AirForce 1", "Photos/NikeWomenAirForce1White.jpeg", "white", 2650.00, 4, 1, 6)
    //     await addShoe("Nike Women AirForce 1", "Photos/NikeWomenAirForce1White.jpeg", "white", 2650.00, 2, 1, 7)
    // // await addShoe("Vans Men's Old Skool","Photos/Vans Men's Old Skool BlackORWhite SneakerR949.95.jpeg","black",949.95,21,4,5)
    // await addShoe("Vans Men's Old Skool","Photos/Vans Men's Old Skool BlackORWhite SneakerR949.95.jpeg","black",949.95,13,4,5)


    // // await addShoe("Puma Rickie","Photos/Men's Puma Rickie Whiteor Black R999.95.jpeg","white",999.95,15,3,5)
    // await addShoe("Puma Rickie","Photos/Men's Puma Rickie Whiteor Black R999.95.jpeg","white",999.95,9,3,6)


    // // await addShoe("Vans Old Skool","Photos/Vans Men's Old Skool Tan SneakerBrownR999.95.jpeg","brown",999.95,9,4,6)
    // await addShoe("Vans Old Skool","Photos/Vans Men's Old Skool Tan SneakerBrownR999.95.jpeg","brown",999.95,8,4,7)

    // // await addShoe("Puma Diesier","Photos/PumaMen'sDiesiertoGreyBootR1899.95.jpeg","grey",1899.95,17,3,6)
    // await addShoe("Puma Diesier","Photos/PumaMen'sDiesiertoGreyBootR1899.95.jpeg","grey",1899.95,19,3,5)

    // // await addShoe("Vans Sk8-Hi","Photos/Vans Men's Sk8-Hi White SneakerR899.95.jpeg","white",899.95,17,4,6)
    // await addShoe("Vans Sk8-Hi","Photos/Vans Men's Sk8-Hi White SneakerR899.95.jpeg","white",899.95,17,4,5)


    //  await addShoe("Puma Rider FV Base","Photos/PumaMensRiderFVBaseGreyR1899.95.jpeg","grey",1899.95,17,3,6)
    //  await addShoe("Puma Rider FV Base","Photos/PumaMensRiderFVBaseGreyR1899.95.jpeg","grey",1899.95,19,3,7)

    // // await addShoe("Puma Mayze Crash Prm","Photos/pumaWomenMayzeCrashPrmWHiteOrBlackR1899.95.jpeg","white",1899.95,11,3,6)
    // await addShoe("Puma Mayze Crash Prm","Photos/pumaWomenMayzeCrashPrmWHiteOrBlackR1899.95.jpeg","white",1899.95,13,3,7)

    // // await addShoe("Vans Checkerboard Sentry SK8-Hi","Photos/Vans Women's Checkerboard Sentry SK8-Hi BlackORWhite SneakerR15599.95.jpeg","white",999.00,11,4,6)
    // await addShoe("Vans Checkerboard Sentry SK8-Hi","Photos/Vans Women's Checkerboard Sentry SK8-Hi BlackORWhite SneakerR15599.95.jpeg","white",999.00,13,4,5)

    // // await addShoe("Vans Sk8-Hi", "Photos/Vans Women's Old Skool Platform Poppy Checkerboard SneakerR1149.00.jpeg", "checkerboard", 899.95, 10, 4, 5)
    // await addShoe("Vans Sk8-Hi", "Photos/Vans Women's Old Skool Platform Poppy Checkerboard SneakerR1149.00.jpeg", "checkerboard", 899.95, 6, 4, 7)


    // // await addShoe("Puma Carina 2.0 Bold Warm", "Photos/WomenPumaCarina2.0BoldWarmWhiteR1199.5.jpeg", "white", 1199.5, 8, 3, 6)
    // await addShoe("Puma Carina 2.0 Bold Warm", "Photos/WomenPumaCarina2.0BoldWarmWhiteR1199.5.jpeg", "white", 1199.5, 2, 3, 7)


    // } catch (error) {
    //     console.log("error "+error.message)
    // }

    async function getAllShoe() {
        const results = await db.many(`SELECT * FROM shoes;`)
        return results
    }
    async function getShoeByBrand(brandname) {
            const getShoeByBrandQuery = `
            SELECT id 
            FROM brand
            WHERE brand_name = $1;
            `;
            const brandId = await db.one(getShoeByBrandQuery, [brandname]);
            const id = brandId.id

            const results = await db.many(
                `SELECT * 
                FROM shoes
                WHERE brand_id =$1;
                `, [id])
            return results

    }
    // await getShoeByBrand('nike')

    async function getShoeBySize(size) {

        const results = await db.many(
            `SELECT * 
            FROM shoes
            WHERE shoe_size =$1;
            `, [size])
    
        return results

    }
    async function getShoeByBrandAndSize(brandname,size) {
        const getShoeByBrandQuery = `
        SELECT id 
        FROM brand
        WHERE brand_name = $1;
        `;
        const brandId = await db.one(getShoeByBrandQuery, [brandname]);
        const id = brandId.id

        const results = await db.many(
            `SELECT * 
            FROM shoes
            WHERE brand_id =$1 AND shoe_size = $2;
            `, [id,size])

    return results

}
    async function decreaseStock(shoe_id) {
        const decreaseStockShoeQuery = `
        UPDATE shoes
        SET stock = stock - 1
        WHERE id = $1 ; 
        `;
        await db.none(decreaseStockShoeQuery, [shoe_id]);
    }

    async function increaseStock(shoe_name, color, shoe_size) {
        const increaseStockShoeQuery = `
        UPDATE shoes
        SET stock = stock + 1
        WHERE shoe_name = $1 AND shoe_color = $2 AND shoe_size = $3; 
         `;
        await db.none(increaseStockShoeQuery, [shoe_name, color, shoe_size])
    }

    async function replaceStock(username, shoe_id, qty) {
        const replaceStockShoeQuery = `
        UPDATE shoes
        SET stock = stock + $1
        WHERE id = $2;  
        `;

        await db.none(replaceStockShoeQuery, [qty, shoe_id]);

        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        const userId = await db.one(getuserIdQuery, [username])

        const getpriceQuery = `
        SELECT price
        FROM shoes
        WHERE id = $1;
        `;

        const shoePrice = await db.one(getpriceQuery, [shoe_id])

        
        const updatePriceCartQuery = `
        UPDATE cart
        SET amount = ($1*cart.QTY)
        WHERE shoe_id = $2;  
        `;

        await db.none(updatePriceCartQuery, [parseFloat(shoePrice.price),shoe_id]);

        const removeShoe = `
            SELECT qty
            FROM cart
            WHERE user_id  = $1 AND shoe_id = $2; 
            `;

        const quantity = await db.one(removeShoe, [userId.id, shoe_id]);

        if (quantity.qty <= 0) {
            await db.none(`DELETE FROM cart WHERE user_id = $1 AND shoe_id = $2;`, [userId.id, shoe_id]);
        }


    }


    // try {
    //     await addUsername('bheka', "1234",'lushaba','bheka.bj@gmail.com')
    // } catch (error) {
    //     console.log("error ",error.message)
    // }



    async function addShoeToCart(username, shoe_id) {
        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        const userId = await db.one(getuserIdQuery, [username])


        const getpriceQuery = `
        SELECT price
        FROM shoes
        WHERE id = $1;
        `;

        const shoePrice = await db.one(getpriceQuery, [shoe_id])



        const addShoeToCartQuery = `
        INSERT INTO cart (user_id,shoe_id,QTY,amount)
        VALUES($1,$2,1,$3)
        ON CONFLICT(shoe_id) DO UPDATE SET QTY = cart.QTY + 1;
        `;
        await db.none(addShoeToCartQuery, [userId.id, shoe_id,parseFloat(shoePrice.price)])
        
        const updatePriceCartQuery = `
        UPDATE cart
        SET amount = ($1*cart.QTY)
        WHERE shoe_id = $2;  
        `;

        await db.none(updatePriceCartQuery, [parseFloat(shoePrice.price),shoe_id]);

        const decreaseStockShoeQuery = `
        UPDATE shoes
        SET stock = stock - 1
        WHERE id = $1 ; 
        `;
        await db.none(decreaseStockShoeQuery, [shoe_id]);
    }
    // try {
    //     await addShoeToCart(1,1)
    // } catch (error) {
    //     console.log("error ",error.message)
    // }

    async function getCart(username) {
        const getuserIdQuery = `
        SELECT id
        FROM users
        WHERE username = $1;
         `;

        let userId = await db.one(getuserIdQuery, [username])


        const getCartQuery = `
        SELECT c.user_id, c.shoe_id,c.QTY, c.amount, c.bought,
        s.shoe_name, s.shoe_picture, s.shoe_color, s.price, s.stock, s.brand_id, s.shoe_size
        FROM cart c
        JOIN shoes s ON c.shoe_id = s.id
        WHERE c.user_id = $1;
         `;
         let total = 0;
         let cartTotal = 0;
        const results = await db.manyOrNone(getCartQuery, [userId.id])
        results.forEach(shoe => {
            total+=parseFloat(shoe.amount)
            cartTotal+=parseFloat(shoe.qty)
        });
        console.log(results)
        return {
            results,
            total:total.toFixed(2),
            cartTotal:cartTotal
        }
    }



    // try {
    //     await  getCart("bheka")
    // } catch (error) {
    //     console.log("error ",error.message)
    // }
    async function checkoutCart(shoes) {
        const updateBuyStatusQuery = `
        UPDATE cart
        SET bought = true
        WHERE shoe_id = $1;  
         `;


        await db.manyOrNone(updateBuyStatusQuery, [shoes.id])

    }

    return {
        getAllShoe,
        decreaseStock,
        increaseStock,
        replaceStock,
        addShoe,
        addShoeToCart,
        getCart,
        addUsername,
        checkoutCart,
        getShoeByBrand,
        getShoeBySize,
        getShoeByBrandAndSize
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
//     await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,5)
//     // await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,6)
//     // await addShoe("Nike Junior Blazer","Photos/Nike Junior Blazer.jpeg","white",1599.95,17,1,7)

//     await addShoe("adidas Originals Forum Exhibit Mid 2 Sneaker.jpeg","Photos/adidas Originals Men's Forum Exhibit Mid 2 NavyOrGreen SneakerR229995.jpeg","green",2299.95,11,2,6)
//     // await addShoe("adidas Originals Forum Exhibit Mid 2 Sneaker.jpeg","Photos/adidas Originals Men's Forum Exhibit Mid 2 NavyOrGreen SneakerR229995.jpeg","green",2299.95,14,2,7)

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


    // await addShoe("Puma Rider FV Base","Photos\PumaMensRiderFVBaseGreyR1899.95.jpeg","grey",1899.95,17,3,6)
    // await addShoe("Puma Rider FV Base","Photos\PumaMensRiderFVBaseGreyR1899.95.jpeg","grey",1899.95,19,3,7)


    // await addShoe("Puma Mayze Crash Prm","Photos/pumaWomenMayzeCrashPrmWHiteOrBlackR1899.95.jpeg","white",1899.95,11,3,6)
    // await addShoe("Puma Mayze Crash Prm","Photos/pumaWomenMayzeCrashPrmWHiteOrBlackR1899.95.jpeg","white",1899.95,13,3,7)

    // await addShoe("Vans Checkerboard Sentry SK8-Hi","Photos/Vans Women's Checkerboard Sentry SK8-Hi BlackORWhite SneakerR15599.95.jpeg","white",999.00,11,4,6)
    // await addShoe("Vans Checkerboard Sentry SK8-Hi","Photos/Vans Women's Checkerboard Sentry SK8-Hi BlackORWhite SneakerR15599.95.jpeg","white",999.00,13,4,5)


    // await addShoe("Vans Sk8-Hi","Photos/Vans Women's Old Skool Platform Poppy Checkerboard SneakerR1149.00.jpeg","white",899.95,10,4,5)
    // await addShoe("Vans Sk8-Hi","Photos/Vans Women's Old Skool Platform Poppy Checkerboard SneakerR1149.00.jpeg","white",899.95,6,4,7)


    // await addShoe("Puma Carina 2.0 Bold Warm","Photos/WomenPumaCarina2.0BoldWarmWhiteR1199.5.jpeg","white",1199.5,8,3,6)
    // await addShoe("Puma Carina 2.0 Bold Warm","Photos/WomenPumaCarina2.0BoldWarmWhiteR1199.5.jpeg","white",1199.5,2,3,7)


// //     // await addShoe("Air Jordan 1","Photos/Yellow and white air jordans.jpg","yellow",3000,14,1,6)
// //     // await addShoe("Air Jordan 1","Photos/Yellow and white air jordans.jpg","yellow",3000,13,1,7)


// //     // await addShoe("Yellow Vans","Photos/WHite air jordans 13.jpg","yellow",450,5,1,6)
// //     // await addShoe("Yellow Vans","Photos/WHite air jordans 13.jpg","yellow",450,21,1,7)



// //     // await addShoe("Vans","Photos/yellow vans.jpg","yellow",3000,18,4,5)
// //     // await decreaseStock("Vans","yellow",5)
// //     // await increaseStock("Vans","yellow",5)
// //     // await replaceStock("Vans","yellow",4,5)
// } catch (error) {
//     console.log("error "+error.message)
// }