import express from "express";;
import {engine} from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session"
import pgPromise from "pg-promise";
import flash from "express-flash";
import ShoeService from "./service/shoes.js";
import ShoesApi from "./api/shoes.js";
import cors from "cors"

let app = express();
const pgp = pgPromise();

const connectionString = process.env.DATABASE_URL 


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

const shoeService = ShoeService(db)
const shoesApi = ShoesApi(shoeService)

app.get("/",async function(req,res){
    try {
        const list = await shoeService.getAllShoe()
        const cart = await (await shoeService.getCart('bheka')).results
        const total =  await (await shoeService.getCart('bheka')).total
        const cartItems =  await (await shoeService.getCart('bheka')).cartItems
        res.render("index",{list,cart,total,cartItems});
    } catch (error) {
        res.render("index");
    }
  
});
app.post("/home",async function(req,res){
   res.redirect("/")
  
});


app.get('/api/shoes', shoesApi.all);
app.get('/api/shoes/brand/:brandname', shoesApi.allBrand);
app.get('/api/shoes/size/:size', shoesApi.allsizes);
app.get('/api/shoes/brand/:brandname/size/:size',shoesApi.brandAndSize);
app.post('/api/shoes/addToCart/:username',shoesApi.addToCart);
app.get('/api/shoes/getCart/:username',shoesApi.getCart);
app.post('/api/shoes/cancelCart/:username',shoesApi.cancelCart);
app.post("/api/shoes/sold/:username",shoesApi.checkoutCart);
app.post('/api/shoes/',shoesApi.addShoeToStock);
app.get('/api/shoes/history/:username',shoesApi.history);

let Port = process.env.Port || 3004;

app.listen(Port,()=>{
    console.log(`App Started on Port http://localhost:${Port}`);
});