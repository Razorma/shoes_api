
export default function ShoesApi(shoeService){
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
    async function logIn(req, res,next){
        try {
            const {username, password} = req.body
             const role = await shoeService.login(username, password);
            res.json({
                status:'success',
                role:role
            });
        } catch (error) {
			res.json({
				status: "error",
				error: error.message
			});
		}

    }
    async function logout(req, res,next){
        try {
            await shoeService.logout();
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
    async function addToCart(req, res,next){
        try {
            const shoeId = Number(req.body.id)
            await shoeService.addShoeToCart(shoeId);
            res.json({
                status:'success',
            });
        } catch (err) {
			res.json({
				status: "error",
				error: err.message
			});
            
		}

    }
    async function getCart(req, res,next){
        try {
            const {results,total,cartItems}= await shoeService.getCart()
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
    async function cancelCart(req, res,next){
        try {
            const shoeId = Number(req.body.id)
            const QTY = Number(req.body.qty)
            await shoeService.replaceStock(shoeId,QTY);
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
    async function checkoutCart(req, res){
        try {
            await shoeService.checkoutCart();
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
    return{
        addUser,
        logIn,
        logout,
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
        getOrders
    }
}