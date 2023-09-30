
const orderCart = document.querySelector(".cart");
const openCartElem = document.querySelector(".icon");
const closeCart = document.querySelector(".closeCart");
const cartTemplate = document.querySelector(".cartTemplate");
const productTemplate = document.querySelector(".productTemplate")
const productContainer = document.querySelector("#products")
const cartContainer = document.querySelector(".cartProducts")
const productButton = document.querySelector(".productButton")
const totalItems = document.querySelector(".totalCart")
const amountTotal = document.querySelector(".amountTotal")
const filterButton = document.querySelector(".searchNav")
const backNavButton = document.querySelector(".backNav")
const cartErrorElem = document.querySelector(".errorCart")

let cartTemplateInstance = Handlebars.compile(cartTemplate.innerHTML)
let productTemplateInstance = Handlebars.compile(productTemplate.innerHTML)


openCartElem.addEventListener("click", () => {
    orderCart.style.right = "0";
})
closeCart.addEventListener("click", () => {
    orderCart.style.right = "-600px";
})
Handlebars.registerHelper('jsonStringify', function (context) {
    return JSON.stringify(context);
});

const shoesService = shoes()


function showShoes(brandName, size) {

    if (brandName && size) {
        shoesService
            .getShoeByBrandAndSize(brandName, size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (brandName && !size) {
        shoesService
            .getShoeByBrand(brandName)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (!brandName && size) {
        shoesService
            .getShoeBySize(size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else {
        shoesService
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    }

}
function showCart(username) {
    let init = 0;
    shoesService
        .getCart(username)
        .then(function (results) {
            let response = results.data;
            let data = response.data;
            let total = response.total
            let cartItems = response.cartItems

            let html = cartTemplateInstance({
                cart: data
            });
            if (cartItems === 0) {
                cartItems = ""
            }
            if (!cartItems) {
                cartItems = ""
            }
            if (!total) {
                total = init.toFixed(2)
            }
            let shoesHTML = html;
            cartContainer.innerHTML = shoesHTML;
            totalItems.innerHTML = cartItems
            amountTotal.innerHTML = total
        });
}




showCart("bheka")
showShoes()



async function addToCart(username, id) {
    await shoesService.addToCart(username, id)
        .then((results) => {
            let response = results.data;
            if (response.error) {
                cartErrorElem.innerHTML = response.error
                setTimeout(() => {
                    cartErrorElem.innerHTML = ""
                }, 3000)
            }



        })
    showShoes()
    showCart(username)

}
async function deleteFromCart(username, id, qty) {
    await shoesService.deleteCartItem(username, id, qty);

    showShoes();
    showCart(username);

}
async function chechoutFromCart(username) {
    await shoesService.checkoutCartItem(username);
    showShoes();
    showCart(username);

}
filterButton.addEventListener("click", () => {
    const selectBrandElem = document.querySelector(".selectBrandNav")
    const selectSizeElem = document.querySelector(".selectSizeNav")
    const errorSelect = document.querySelector(".errorSelect")
    if (!selectBrandElem.value && !selectSizeElem.value) {
        errorSelect.innerHTML = "Please select Brand or Size"
        setTimeout(() => {
            errorSelect.innerHTML = ""
        }, 3000)
    } else {
        showShoes(selectBrandElem.value, selectSizeElem.value)
        backNavButton.style.display = "flex"
    }

})
backNavButton.addEventListener("click", () => {
    showShoes()
    backNavButton.style.display = "none"
})
function shoes() {
    function getShoes() {
        return axios.get('/api/shoes')
    }
    function addShoe(data) {
        return axios.post('/api/shoes', data)
    }
    function getShoeByBrand(brandName) {
        return axios.get(`/api/shoes/brand/${brandName}`)
    }
    function getShoeBySize(size) {
        return axios.get(`/api/shoes/size/${size}`)
    }
    function getShoeByBrandAndSize(brandName, size) {
        return axios.get(`/api/shoes/brand/${brandName}/size/${size}`)
    }
    function getCart(username) {
        return axios.get(`/api/shoes/getCart/${username}`)
    }
    function addToCart(username, id) {
        return axios.post(`/api/shoes/addToCart/${username}`, {
            "id": id
        })
    }
    function deleteCartItem(username, id, qty) {
        return axios.post(`/api/shoes/cancelCart/${username}`, {
            "id": id,
            "qty": qty
        })
    }
    function checkoutCartItem(username) {
        return axios.post(`/api/shoes/sold/${username}`)
    }

    return {
        getShoes,
        addShoe,
        getShoeByBrand,
        getCart,
        getShoeBySize,
        getShoeByBrandAndSize,
        addToCart,
        deleteCartItem,
        checkoutCartItem
    }
}