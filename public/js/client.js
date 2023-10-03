
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
const loginUsername = document.querySelector(".login-username")
const loginPassword = document.querySelector(".login-password")
const loginMess = document.querySelector(".loginMess")
const logInButton = document.querySelector(".logInButton")
const signUpmess = document.querySelector(".signUpmess")
const signUpButton = document.querySelector(".signUpButton")
const bootstrapLoginModal = document.querySelector(".btn-close")
const logoutElem = document.querySelector(".logoutElem")
const loginButtonModal = document.querySelector(".loginButtonModal")
const addShoeCanvasButton = document.querySelector(".bi-database-fill-gear")
const orderTemplate = document.querySelector(".orderTemplate")





const SignUpUsername = document.querySelector(".SignUp-username")
const surname = document.querySelector(".surname")
const SignUpEmail = document.querySelector(".SignUp-email")
const SignUpPassword = document.querySelector(".SignUp-password")

let cartTemplateInstance = Handlebars.compile(cartTemplate.innerHTML)
let productTemplateInstance = Handlebars.compile(productTemplate.innerHTML)
let orderTemplateInstance = Handlebars.compile(orderTemplate.innerHTML)

openCartElem.addEventListener("click", () => {
    orderCart.style.right = "0";
})
closeCart.addEventListener("click", () => {
    orderCart.style.right = "-600px";
})
Handlebars.registerHelper('jsonStringify', function (context) {
    return JSON.stringify(context);
});
Handlebars.registerHelper('formatCurrency', function (value) {
    return 'R' + parseFloat(value).toFixed(2);
  });

const shoesService = shoes()
let currentBrand = ""
let currentSize = ""
let loginUser = localStorage.getItem("loginUser");
if (loginUser) {
    logoutElem.innerHTML = `<i class="bi bi-box-arrow-left " id="logoutIcon"onclick="logoutUser()"></i>`
}
let roleUser = localStorage.getItem("roleUser");
if (roleUser) {
    addShoeCanvasButton.style.display = 'flex'
}

function showShoes(brandName, size) {

    if (brandName && size) {
        currentBrand = brandName
        currentSize = size
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
        currentBrand = brandName
        currentSize = ""
        shoesService
            .getShoeByBrand(brandName)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (response.data === "") {
                    productContainer.classList.add('danger')
                    productContainer.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        productContainer.innerHTML = ""
                        productContainer.classList.remove('danger')
                    }, 3000)
                }
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (!brandName && size) {
        currentBrand = ""
        currentSize = size
        shoesService
            .getShoeBySize(size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                productContainer.classList.add('danger')
                productContainer.innerHTML = "Out Of Stock"
                setTimeout(() => {
                    productContainer.innerHTML = ""
                    productContainer.classList.remove('danger')
                }, 3000)
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else {
        currentBrand = ""
        currentSize = ""
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
function showCart() {
    let init = 0;
    shoesService
        .getCart()
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

async function addUserSignUp(name, password, surname, email) {
    if (name === "") {
        signUpmess.innerHTML = "Please enter Name"
        setTimeout(() => {
            signUpmess.innerHTML = ""
        }, 3000)

    } else if (password === "") {
        signUpmess.innerHTML = "Please enter Password"
        setTimeout(() => {
            signUpmess.innerHTML = ""
        }, 3000)

    } else if (surname === "") {
        signUpmess.innerHTML = "Please enter Surname"
        setTimeout(() => {
            signUpmess.innerHTML = ""
        }, 3000)

    } else if (email === "") {
        signUpmess.innerHTML = "Please enter Email"
        setTimeout(() => {
            signUpmess.innerHTML = ""
        }, 3000)

    } else {
        await shoesService.signUp(name, password, surname, email)
            .then((results) => {
                let response = results.data;
                Rstatus = response.status
                if (response.error) {
                    signUpmess.innerHTML = "User already exists"
                    setTimeout(() => {
                        signUpmess.innerHTML = ""
                    }, 3000)
                }

                if (response.status === 'success') {
                    signUpmess.innerHTML = 'User successfully added'
                    setTimeout(() => {
                        signUpmess.innerHTML = ""
                    }, 3000)
                }

            })
    }


}
async function userLogin(name, password) {
    if (name === "") {
        loginMess.innerHTML = "Please enter Name"
        setTimeout(() => {
            loginMess.innerHTML = ""
        }, 3000)

    } else if (password === "") {
        loginMess.innerHTML = "Please enter Password"
        setTimeout(() => {
            loginMess.innerHTML = ""
        }, 3000)

    } else {

        await shoesService.login(name, password)
            .then((results) => {
                let response = results.data;
                console.log(response.role, 'lolo')
                if (response.role === 'admin') {
                    localStorage.setItem("roleUser", response.role);
                    addShoeCanvasButton.style.display = 'flex'
                }


                if (response.error) {
                    loginMess.innerHTML = response.error
                    setTimeout(() => {
                        loginMess.innerHTML = ""
                    }, 3000)
                }
                if (response.status === 'success') {
                    localStorage.setItem("loginUser", name);
                    logoutElem.classList.add('logoutIcon')
                    logoutElem.innerHTML = `<i class="bi bi-box-arrow-left " id="logoutIcon"></i>`
                    bootstrapLoginModal.click()
                    location.reload()

                }
            })
    }
}

// login(username, password)
//addUserSignUp('jayson', 'iloveb', 'code', 'j@gmail.com')


showCart()
if (!roleUser) {
    showShoes()
}
function showOrders() {
    shoesService
        .getOrders()
        .then(function (results) {
            let response = results.data;
            let data = response.data;
            let total = response.total
            let cartItems = response.cartItems
            let html = orderTemplateInstance({
                results: data,
                total,
                cartItems
                
            });
            let shoesHTML = html;
            productContainer.innerHTML = shoesHTML;
        });


}
if (roleUser) {
    showOrders()
}
signUpButton.addEventListener('click', function () {
    addUserSignUp(SignUpUsername.value, SignUpPassword.value, surname.value, SignUpEmail.value)
    SignUpUsername.value = ""
    SignUpPassword.value = ''
    surname.value = ""
    SignUpEmail.value = ''
})
logInButton.addEventListener('click', function () {
    userLogin(loginUsername.value, loginPassword.value)
    loginUsername.value = ""
    loginPassword.value = ''
})

async function addToCart(id) {
    await shoesService.addToCart(id)
        .then((results) => {
            let response = results.data;
            if (response.error) {
                cartErrorElem.innerHTML = response.error
                setTimeout(() => {
                    cartErrorElem.innerHTML = ""
                }, 3000)
                if (!loginUser) {
                    loginButtonModal.click()
                }

            }
        })

    showShoes(currentBrand, currentSize)
    showCart()

}

async function deleteFromCart(id, qty) {
    await shoesService.deleteCartItem(id, qty);

    showShoes(currentBrand, currentSize);
    showCart();

}
async function chechoutFromCart() {
    await shoesService.checkoutCartItem();
    showShoes(currentBrand, currentSize);
    showCart();

}



function logoutUser() {
    if (!confirm("You are about to logout")) {
        return;
    } else {
        logoutElem.innerHTML = '<i data-bs-toggle="modal" data-bs-target="#loginModal" class="bi bi-person-circle"></i>'
        localStorage.removeItem("loginUser");
        localStorage.removeItem("roleUser");
        shoesService.logout()
        location.reload()
    }

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
    function signUp(username, password, surname, email) {
        return axios.post('/api/shoes/addUser', {
            "username": username,
            "password": password,
            'surname': surname,
            'email': email
        })
    }
    function login(username, password) {
        return axios.post('/api/login/', {
            "username": username,
            "password": password,
        })
    }
    function logout() {
        return axios.post('/api/logout')
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
    function getCart() {
        return axios.get(`/api/shoes/getCart`)
    }
    function getOrders() {
        return axios.get(`/api/getOrders`)
    }
    function addToCart(id) {
        return axios.post(`/api/shoes/addToCart`, {
            "id": id
        })
    }
    function deleteCartItem(id, qty) {
        return axios.post(`/api/shoes/cancelCart`, {
            "id": id,
            "qty": qty
        })
    }
    function checkoutCartItem() {
        return axios.post(`/api/shoes/sold`)
    }

    return {
        signUp,
        login,
        getShoes,
        addShoe,
        getShoeByBrand,
        getCart,
        getShoeBySize,
        getShoeByBrandAndSize,
        addToCart,
        deleteCartItem,
        checkoutCartItem,
        logout,
        getOrders
    }
}