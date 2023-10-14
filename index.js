// Import necessary libraries
import express from "express";;
import {engine} from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session"
import pgPromise from "pg-promise";
import flash from "express-flash";
import ShoeService from "./service/shoes.js";
import ShoesApi from "./api/shoes.js";
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config();

// Initialize app and pg-promise
let app = express();
const pgp = pgPromise();

// Define the database connection string
const connectionString = process.env.DATABASE_URL 

// Connect to the database using pgp
const db = pgp({ connectionString});

// Setup the Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(
    cors({
        origin:"*"
    })
)

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(session({ 
    secret: 'Razorma', 
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());


//get the database and routes function
const shoeService = ShoeService(db)
const shoesApi = ShoesApi(shoeService)

app.get("/",async function(req,res){
    try {
        const list = await shoeService.getAllShoe()
        res.render("index",{list});
    } catch (error) {
        res.render("index");
    }
  
});
app.post("/home",async function(req,res){
   res.redirect("/")
  
});

//Define get and post routes for the Admin pages
app.get('/api/shoes', shoesApi.all);
app.get('/api/shoes/brand/:brandname', shoesApi.allBrand);
app.post('/api/shoes/addUser', shoesApi.addUser);
app.get('/api/shoes/size/:size', shoesApi.allsizes);
app.get('/api/shoes/brand/:brandname/size/:size',shoesApi.brandAndSize);
app.get('/api/shoes/color/:color',shoesApi.allColor);
app.get('/api/shoes/brand/:brandname/color/:color',shoesApi.brandAndColor);
app.get('/api/shoes/size/:size/color/:color',shoesApi.sizeAndColor);  
app.get('/api/shoes/brand/:brandname/color/:color/size/:size',shoesApi.sizeColorAndBrand);    
app.post('/api/addToCart/username/:username',shoesApi.addToCart);
app.post('/api/login/',shoesApi.logIn);
app.get('/api/getCart/username/:username',shoesApi.getCart);
app.get('/api/getOrders',shoesApi.getOrders)
app.post('/api/shoes/cancelCart',shoesApi.cancelCart);
app.post("/api/shoes/sold/:username",shoesApi.checkoutCart);
app.post('/api/shoes/',shoesApi.addShoeToStock);
app.get('/api/shoes/history',shoesApi.history);
app.get('/api/sizes',shoesApi.getAvailableShoeSizes);
app.post('/api/clearCartHistory',shoesApi.adminClearCartHistory);


//Define the port
let Port = process.env.Port || 3004;

//start the app on the port
app.listen(Port,()=>{
    console.log(`App Started on Port http://localhost:${Port}`);
});