
export default function ShoesApi(shoeService){
    async function addShoeToStock(req, res,next){
        try {
            const {shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size} = req.body
            let results = await shoeService.addShoe(shoe_name, shoe_picture, shoe_color, price, stock, brand_id, shoe_size);
            res.json({
                status:'success'
            });
        } catch (error) {
            next(error)
        }

    }
    async function all(req, res,next){
        try {
            let results = await shoeService.getAllShoe();
            res.json({
                status:'success',
                data:results
            });
        } catch (error) {
            next(error)
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
        } catch (error) {
            next(error)
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
        } catch (error) {
            next(error)
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
        } catch (error) {
            next(error)
        }

    }
    async function addToCart(req, res,next){
        try {
            const shoeId = req.params.id
            const username = req.params.username
            await shoeService.addShoeToCart(username,shoeId);
            res.json({
                status:'success',
            });
        } catch (error) {
            next(error)
        }

    }
    async function getCart(req, res,next){
        try {
            const username = req.params.username
            const results = await (await shoeService.getCart('bheka')).results;
            const total = await (await shoeService.getCart('bheka')).total
            const cartTotal = await (await shoeService.getCart('bheka')).cartTotal
            res.json({
                status:'success',
                data: results,
                total:total,
                cartTotal:cartTotal
            });
        } catch (error) {
            next(error)
        }

    }
    async function cancelCart(req, res,next){
        try {
            const username = req.params.username
            const shoeId = req.params.id
            const QTY = req.params.qty
            await shoeService.replaceStock(username,shoeId,QTY);
            res.json({
                status:'success'
            });
        } catch (error) {
            next(error)
        }

    }
    return{
        all,
        allBrand,
        allsizes,
        brandAndSize,
        addToCart,
        getCart,
        cancelCart,
        addShoeToStock
    }
}