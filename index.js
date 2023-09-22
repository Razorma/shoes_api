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

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:jayson@2001@localhost:5432/shoes_api';


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
        const list = await db.many(`SELECT * FROM shoes;`)
        const cart = await (await shoeService.getCart('bheka')).results
        const total =  await (await shoeService.getCart('bheka')).total
        const cartTotal =  await (await shoeService.getCart('bheka')).cartTotal
        res.render("index",{list,cart,total,cartTotal});
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
app.post('/api/shoes/addToCart/:id/username/:username',shoesApi.addToCart);
app.get('/api/shoes/getCart/username/:username',shoesApi.getCart);
app.post('/api/shoes/cancelCart/username/:username/shoeId/:id/quantity/:qty',shoesApi.cancelCart);
app.post('/api/shoes/addShoeToStock/:name/:color/:brand/:photo/:price/:size/:stock',shoesApi.addShoeToStock);
// app.get('/api/shoes/sold/:id',shoesApi.brandAndSize);
///api/shoes/getCart/username/bheka
///api/shoes/cancelCart/username/bheka/shoeId/1/quantity/1
///api/shoes/addToCart/1/username/bheka
let Port = process.env.Port || 3004;

app.listen(Port,()=>{
    console.log(`App Started on Port http://localhost:${Port}`);
});