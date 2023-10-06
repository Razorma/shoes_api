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

const connectionString = process.env.DATABASE_URL || 'postgres://erazkwju:Dn8Pk1DLefLORNbGDRf2LFtREpf0-Qtu@tai.db.elephantsql.com/erazkwju'


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
        res.render("client");
    }
  
});
app.post("/home",async function(req,res){
   res.redirect("/")
  
});


app.get('/api/shoes', shoesApi.all);
app.get('/api/shoes/brand/:brandname', shoesApi.allBrand);
app.post('/api/shoes/addUser', shoesApi.addUser);
app.get('/api/shoes/size/:size', shoesApi.allsizes);
app.get('/api/shoes/brand/:brandname/size/:size',shoesApi.brandAndSize);
app.get('/api/shoes/color/:color',shoesApi.allColor);
app.get('/api/shoes/brand/:brandname/color/:color',shoesApi.brandAndColor);
app.get('/api/shoes/size/:size/color/:color',shoesApi.sizeAndColor);  
app.get('/api/shoes/brand/:brandname/color/:color/size/:size',shoesApi.sizeColorAndBrand);    
app.post('/api/shoes/addToCart',shoesApi.addToCart);
app.post('/api/login/',shoesApi.logIn);
app.get('/api/shoes/getCart',shoesApi.getCart);
app.get('/api/getOrders',shoesApi.getOrders)
app.post('/api/shoes/cancelCart',shoesApi.cancelCart);
app.post("/api/shoes/sold",shoesApi.checkoutCart);
app.post('/api/shoes/',shoesApi.addShoeToStock);
app.get('/api/shoes/history',shoesApi.history);
app.post('/api/logout',shoesApi.logout);
app.get('/api/sizes',shoesApi.getAvailableShoeSizes);

let Port = process.env.Port || 3004;

app.listen(Port,()=>{
    console.log(`App Started on Port http://localhost:${Port}`);
});