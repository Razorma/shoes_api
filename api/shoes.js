import jwtTokens from "../utils/JWTHelpers.js";
export default function ShoesApi(shoeService){

    //Define a function that will get the user data from the client side to the database function
    async function addUser(req, res,next){
        try {
            const {username, password, surname, email} = req.body
             await shoeService.addUsername(username, password, surname, email,'customer');
            res.json({
                status:'success'
            });
        } catch (error) {
			res.json({
				status: "error",
				error: error.message
			});
		}

    }
    //Define a function that will get user credentials and log them in
    async function logIn(req, res,next){
        try {
            const {email, password} = req.body
            
            const {role, name,user_id} = await shoeService.login(email, password)
          
            if (role === 'admin') {
                const tokens = jwtTokens(user_id)
                res.cookie('admin-token', tokens.accessToken, { 
                    httpOnly: true,
                    secure: true, 
                    sameSite: 'None',
                  })
            } else if (role === 'customer') {
                const tokens = jwtTokens(user_id)
                res.cookie('customer-token', tokens.accessToken, { 
                    httpOnly: true,
                    secure: true, 
                    sameSite: 'None',
                  })
            
            }
            res.json({
                status:'success',
                role:role,
                username:name
            });
        } catch (error) {
			res.json({
				status: "error",
				error: error.message
			});
		}

    }
    function logOut(req, res,next){
        
        res.clearCookie('customer-token') 
        res.clearCookie('admin-token')
        
    }
    
    //define a function that will get the data from the client side and send it to the database to create the shoe
    async function addShoeToStock(req, res,next){
        try {
            const {shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size} = req.body
             await shoeService.addShoe(shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size);
            res.json({
                status:'success'
            });
        } catch (error) {
			res.json({
				status: "error",
				error: error.message
			});
		}

    }

    //Define a function that will get all the shoe that are available and send them to the client side
    async function all(req, res,next){
        try {
            let results = await shoeService.getAllShoe();
            res.json({
                status:'success',
                data:results
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //Define a function that will get the brand of the shoe from the client side and return all the shoes of that brand
    async function allBrand(req, res,next){
        try {
            const brandName = req.params.brandname
            let results = await shoeService.getShoeByBrand(brandName);
            res.json({
                status:'success',
                data: results
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //Define a function that will get the size selected from the client side and return all the shoes of that size from the server
    async function allsizes(req, res,next){
        try {
            const size = req.params.size
            let results = await shoeService.getShoeBySize(size);
            res.json({
                status:'success',
                data: results
            });
        }catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //define a function that will get the color entered and return the shoes of that color
    async function allColor(req, res,next){
        try {
            const color = req.params.color
            let results = await shoeService.getShoeByColor(color);
            res.json({
                status:'success',
                data: results
            });
        }catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //a function o send a request of shoes by their brand and size
    async function brandAndSize(req, res,next){
        try {
            const brandname = req.params.brandname
            const size = req.params.size
            let results = await shoeService.getShoeByBrandAndSize(brandname,size);
            res.json({
                status:'success',
                data: results
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }

    //A function to send a request for shoes by their brand and color
    async function brandAndColor(req, res,next){
        try {
            const brandname = req.params.brandname
            const color = req.params.color
            let results = await shoeService.getShoeByBrandAndColor(brandname,color);
            res.json({
                status:'success',
                data: results
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //A function to send a request for shoes of a specific size and color
    async function sizeAndColor(req, res,next){
        try {
            const size = req.params.size
            const color = req.params.color
            let results = await shoeService.getShoeBySizeAndColor(size,color);
            res.json({
                status:'success',
                data: results
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //A function to send a request for shoes of entered size, color and brand
    async function sizeColorAndBrand(req, res,next){
        try {
            const size = req.params.size
            const color = req.params.color
            const brandname = req.params.brandname
            let results = await shoeService.getShoeBySizeAndColorAndBrand(brandname,size,color);
            res.json({
                status:'success',
                data: results
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    // A function to get the sizes available for a specific shoe
    async function getAvailableShoeSizes(req, res,next){
        try {
            const brandname = req.body.brandname
            const color = req.body.color
            const shoeName = req.body.name
            let results = await shoeService.getAvailableShoeSizes(shoeName,brandname,color);
            res.json({
                status:'success',
                data: results
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //A function to send a request for a shoe to be added to the cart
    async function addToCart(req, res,next){
        try {
            const username = req.params.username
            const shoeId = Number(req.body.id)
            await shoeService.addShoeToCart(username,shoeId);
            res.json({
                status:'success',
            });
        } catch (error) {
			res.json({
				status: "error",
				error: error.message
			});
            
		}

    }
    //a function that sends a request for the cart 
    async function getCart(req, res,next){
        try {
            const username = req.params.username
            const {results,total,cartItems}= await shoeService.getCart(username)
            res.json({
                status:'success',
                data: results,
                total:total,
                cartItems:cartItems
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //A function that sends a request for orders made
    async function getOrders(req, res,next){
        try {
            const {results,total,cartItems}= await shoeService.getOrders()
            res.json({
                status:'success',
                data: results,
                total:total,
                cartItems:cartItems
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

    }
    //A function that sends a request for a shoe to be removed from cart
    async function cancelCart(req, res,next){
        try {
            const username = req.body.username
            const shoeId = Number(req.body.id)
            const QTY = Number(req.body.qty)
            await shoeService.replaceStock(username,shoeId,QTY);
            res.json({
                status:'success'
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
    }
    //A function that send a request for shoes in cart to be bought
    async function checkoutCart(req, res){
        try {
            const username = req.params.username
            await shoeService.checkoutCart(username);
            res.json({
                status:'success'
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
    }

    //A function that sends a request for the history of the purchased shoes
    async function history(req, res){
        try {
            const {results,total,cartItems} = await shoeService.getPurchaseHistory();
            res.json({
                status:'success',
                data: results,
                total:total,
                cartItems:cartItems
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
    }
    // A function that will send a request for the orderd items to be cleard from cart
    async function adminClearCartHistory(req, res){
        try {
            await shoeService.adminClearCartHistory();
            res.json({
                status:'success'
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
    }
    return{
        addUser,
        logIn,
        logOut,
        all,
        allBrand,
        allsizes,
        brandAndSize,
        addToCart,
        getCart,
        cancelCart,
        addShoeToStock,
        checkoutCart,
        history,
        getOrders,
        allColor,
        brandAndColor,
        sizeAndColor,
        sizeColorAndBrand,
        getAvailableShoeSizes,
        adminClearCartHistory
    }
}