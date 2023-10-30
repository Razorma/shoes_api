import ShoeService from "../service/shoes.js";
import assert from 'assert';
import pgPromise from "pg-promise";
import dotenv from 'dotenv'

dotenv.config();

const connectionString = process.env.DATABASE_URL_TEST 

const pgp = pgPromise()
const db = pgp({connectionString})
const shoeService = ShoeService(db);

//Populated brand and size tables

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
describe("Service Function",function (){
    this.timeout(3000);
    before(async ()=>{
        await db.query(`DELETE FROM users;`);
        await db.query(`DELETE FROM shoes;`);
        await db.query(`DELETE FROM cart;`);
        await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
        await db.query(`ALTER SEQUENCE shoes_id_seq RESTART WITH 1;`);
        await db.query(`ALTER SEQUENCE cart_id_seq RESTART WITH 1;`);
    })

    it("Should add a user",async ()=>{
        const username = 'user1';
        const userpassword = 'myPassword';
        const surname = "theuser1"
        const email = "user1@gmail.com"
        const checkTableQuery = `SELECT * FROM users;`

        await shoeService.addUsername(username, userpassword,surname,email,'customer');
    
        const tableRows = await db.query(checkTableQuery);
    
        assert.equal(tableRows.length, 1);

    })
    it("Should add a shoe in the database",async ()=>{
        
        const shoeName = 'spiner';
        const shoePicturePath = '/photos/sinner 360';
        const shoeColor = "green"
        const Price = 1990;
        const inStock = 5;
        const brandId = 1;//nike
        const shoeSize = 7;

        await shoeService.addShoe(shoeName, shoePicturePath, shoeColor, Price, inStock, brandId, shoeSize);
    
        const [tableRows] = await shoeService.getAllShoe();
    
        assert.strictEqual((await shoeService.getAllShoe()).length, 1);

        assert.equal(tableRows.shoe_name,'spiner');
        assert.equal(tableRows.brand_name,'nike');

    })
    it("Should get shoes by brand",async ()=>{
        const shoeName = 'round';
        const shoePicturePath = '/photos/roundhouse';
        const shoeColor = "blue"
        const Price = 2000
        const inStock = 6;
        const brandId = 2;//adidas
        const shoeSize = 6;

        await shoeService.addShoe(shoeName, shoePicturePath, shoeColor, Price, inStock, brandId, shoeSize);

        assert.strictEqual((await shoeService.getAllShoe()).length, 2);
    
        const [tableRowsNike] = await shoeService.getShoeByBrand("nike");
        const [tableRowsAdidas] = await shoeService.getShoeByBrand("adidas");
    
        assert.strictEqual((await shoeService.getShoeByBrand("nike")).length, 1);
        assert.strictEqual((await shoeService.getShoeByBrand("adidas")).length, 1);

        assert.equal(tableRowsNike.shoe_name,'spiner');
        assert.equal(tableRowsAdidas.shoe_name,'round');

        assert.equal(tableRowsNike.brand_name,'nike');
        assert.equal(tableRowsAdidas.brand_name,'adidas');

    })
    it("Should get shoes by size",async ()=>{
    
        const [size6] = await shoeService.getShoeBySize(6);

        try {
           await shoeService.getShoeBySize(5);
        } catch (error) {
            assert.equal(error.message,'No data returned from the query.');
        }
        
        assert.strictEqual((await shoeService.getShoeBySize(6)).length, 1);

        assert.equal(size6.shoe_name,'round');
        assert.equal(size6.brand_name,'adidas');

    })
    it("Should get shoes by color",async ()=>{
    
        const [blueShoe] = await shoeService.getShoeByColor('blue');

        
        
        assert.strictEqual((await shoeService.getShoeByColor('blue')).length, 1);

        assert.equal(blueShoe.shoe_name,'round');
        assert.equal(blueShoe.shoe_color,'blue');

    })
    it("Should get shoes by brand and color",async ()=>{
    
        const [brandAndColor] = await shoeService.getShoeByBrandAndColor('nike','green');

        
        
        assert.strictEqual((await shoeService.getShoeByBrandAndColor('nike','green')).length, 1);

        assert.equal(brandAndColor.brand_name,'nike');
        assert.equal(brandAndColor.shoe_color,'green');

    })
    it("Should get shoes by size and color",async ()=>{
    
        const [sizeAndColor] = await shoeService.getShoeBySizeAndColor(6,'blue');

        
        
        assert.strictEqual((await shoeService.getShoeBySizeAndColor(6,'blue')).length, 1);

        assert.equal(sizeAndColor.shoe_size,6);
        assert.equal(sizeAndColor.shoe_color,'blue');

    })
    it("Should get shoes by brand and size",async ()=>{
    
        const [nikeSize7] = await shoeService.getShoeByBrandAndSize("nike", 7);

        try {
           await shoeService.getShoeByBrandAndSize("nike", 5);
        } catch (error) {
            assert.equal(error.message,'No data returned from the query.');
        }
        
        assert.strictEqual((await shoeService.getShoeByBrandAndSize("nike", 7)).length, 1);

        assert.equal(nikeSize7.shoe_size,7);
        assert.equal(nikeSize7.brand_name,'nike');

    })
    it("Should get shoes by size and color",async ()=>{
    
        const [brandSizeAndColor] = await shoeService.getShoeBySizeAndColorAndBrand('adidas',6, 'blue');

        
        
        assert.strictEqual((await shoeService.getShoeBySizeAndColorAndBrand('adidas',6, 'blue')).length, 1);

        assert.equal(brandSizeAndColor.brand_name,'adidas');
        assert.equal(brandSizeAndColor.shoe_size,6);
        assert.equal(brandSizeAndColor.shoe_color,'blue');

    })
    it("Should add a shoe to cart",async ()=>{
        await shoeService.login('user1', 'myPassword')
    
        await shoeService.addShoeToCart('user1',1)

        const userCart = await shoeService.getCart('user1')
        

        assert.strictEqual((userCart.results).length, 1);

    })
    it("Should return the number of items in a cart",async ()=>{
    
        await shoeService.addShoeToCart('user1',1)

        const userCart = await shoeService.getCart('user1')

        assert.equal(userCart.cartItems,2);
        assert.equal(userCart.total,3980.00);

    })
    it("Should return the total amount of all the items in the cart",async ()=>{
        await shoeService.addShoeToCart('user1',2)

        const userCart = await shoeService.getCart('user1')

        assert.equal(userCart.cartItems,3);
        assert.equal(userCart.total,5980.00);

    })
    it("Should decrease the stock of the shoe when bought",async ()=>{
        //first shoe
        const [userCart] = await shoeService.getAllShoe()


        //Was initially 5 (const inStock = 5)
        assert.strictEqual(userCart.stock,3);

    })
    it("Should replace stock when order cancelled",async ()=>{

        await shoeService.replaceStock('user1',1, 2)
        
        //first shoe
        const [userCart] = await shoeService.getAllShoe()

        //Was 3 after adding to cart
        assert.strictEqual(userCart.stock,5);

    })
    it("Should be able to chechout shoes",async ()=>{

        await shoeService.checkoutCart('user1')

        try {
            await shoeService.getCart('user1')
         } catch (error) {
            assert.equal(error.message,'No data returned from the query.');
         }

    })
    it("Should be able to get all the shoes that were odered",async ()=>{

        const userOrders = await shoeService.getOrders()
        
        assert.strictEqual((userOrders.results).length, 1);

        assert.equal(userOrders.total,2000.00);
        assert.equal(userOrders.cartItems,1);

    })
    
})