//Get refferances to the dom elements
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
const searchToggler = document.querySelector(".search-toggler")
const cartIcon = document.querySelector(".icon")
const selectColorNav = document.querySelector(".selectColorNav")
const selectBrandElem = document.querySelector(".selectBrandNav")
const selectSizeElem = document.querySelector(".selectSizeNav")
const errorSelect = document.querySelector(".errorSelect")
const paymentAmount = document.getElementById('paymentAmount')
const contactsSection = document.getElementById('contacts')
const productLink = document.querySelector(".navPro")
const contactNavElem = document.querySelector('.navContacts')


const nameofShoe = document.querySelector(".nameofShoe")
const colorOfshoe = document.querySelector(".colorOfshoe")
const brandofShoe = document.querySelector(".brandofShoe ")
const photoofShoe = document.querySelector(".photoofShoe")
const priceofShoe = document.querySelector(".priceofShoe")
const sizeofShoe = document.querySelector(".sizeofShoe")
const stockofShoe = document.querySelector(".stockofShoe")
const addShoeButton = document.querySelector(".addShoe")
const messageElem = document.querySelector(".addshoeErrorElem")



const SignUpUsername = document.querySelector(".SignUp-username")
const surname = document.querySelector(".surname")
const SignUpEmail = document.querySelector(".SignUp-email")
const SignUpPassword = document.querySelector(".SignUp-password")

//create instances fot the handlebars templates
let cartTemplateInstance = Handlebars.compile(cartTemplate.innerHTML)
let productTemplateInstance = Handlebars.compile(productTemplate.innerHTML)
let orderTemplateInstance = Handlebars.compile(orderTemplate.innerHTML)


//Get the input for signup name if it exists

SignUpUsername.addEventListener('keydown', function (press) {
    //validate if it is real name
    const letterRegex = /^[a-zA-Z ]*$/;
    if (!letterRegex.test(press.key)) {
        //Add the messageclass
        document.querySelector('.signUpmess').classList.add("text-danger");
        document.querySelector('.signUpmess').innerHTML = "Please enter real name of only letters";
        //Add remove the element
        setTimeout(function () {
            document.querySelector('.signUpmess').classList.remove("text-danger");
            document.querySelector('.signUpmess').innerHTML = '';
        }, 2500)
        //prevent the character
        press.preventDefault();
    }
});
surname.addEventListener('keydown', function (press) {
    //validate if it is real name
    const letterRegex = /^[a-zA-Z ]*$/;
    if (!letterRegex.test(press.key)) {
        //Add the messageclass
        document.querySelector('.signUpmess').classList.add("text-danger");
        document.querySelector('.signUpmess').innerHTML = "Please enter real last name of only letters";
        //Add remove the element
        setTimeout(function () {
            document.querySelector('.signUpmess').classList.remove("text-danger");
            document.querySelector('.signUpmess').innerHTML = '';
        }, 2500)
        //prevent the character
        press.preventDefault();
    }
});



//Function to close and open cart
openCartElem.addEventListener("click", () => {
    orderCart.style.right = "0";
})
closeCart.addEventListener("click", () => {
    orderCart.style.right = "-600px";
})
//handlebars helpers to format the data from the api
Handlebars.registerHelper('jsonStringify', function (context) {
    return JSON.stringify(context);
});
Handlebars.registerHelper('formatCurrency', function (value) {
    return 'R' + parseFloat(value).toFixed(2);
});
Handlebars.registerHelper('capitalize', function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
})
//create an instance for the shoes function
const shoesService = shoes()

//initialise the current filtered data info
let currentBrand = ""
let currentSize = ""
let currentColor = ""

let loginUser = localStorage.getItem("loginUser");
if (loginUser) {
    logoutElem.innerHTML = `<i class="bi bi-box-arrow-left " id="logoutIcon"onclick="logoutUser()"> ${localStorage.getItem("loginUser")}</i>`
}
let roleUser = localStorage.getItem("roleUser");
if (roleUser) {
    addShoeCanvasButton.style.display = 'flex'
    searchToggler.style.display = 'none'
    cartIcon.style.display = 'none'
}
//create a function to get the filter function and render data according
function showShoes(brandName, size, color) {

    if (brandName && size && color) {
        currentBrand = brandName
        currentSize = size
        currentColor = color
        shoesService
            .getShoeByBrandSizeAndColor(brandName, size, color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (brandName && size && !color) {
        currentBrand = brandName
        currentSize = size
        currentColor = ""
        shoesService
            .getShoeByBrandAndSize(brandName, size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (color && size && !brandName) {
        currentColor = color
        currentSize = size
        currentBrand = ""
        shoesService
            .getShoeBySizeAndColor(size, color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (brandName && color && !size) {
        currentColor = color
        currentBrand = brandName
        currentSize = ""
        shoesService
            .getShoeByBrandAndColor(brandName, color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (brandName && !size && !color) {
        currentBrand = brandName
        currentSize = ""
        currentColor = ""
        shoesService
            .getShoeByBrand(brandName)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (!brandName && !color && size) {
        currentBrand = ""
        currentColor = ""
        currentSize = size
        shoesService
            .getShoeBySize(size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                let html = productTemplateInstance({
                    list: data
                });
                let shoesHTML = html;
                productContainer.innerHTML = shoesHTML;
            });
    } else if (!brandName && color && !size) {
        currentBrand = ""
        currentColor = color
        currentSize = ""
        shoesService
            .getShoeByColor(color)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                if (!data) {
                    errorSelect.classList.add('danger')
                    errorSelect.innerHTML = "Out Of Stock"
                    setTimeout(() => {
                        errorSelect.innerHTML = ""
                        errorSelect.classList.remove('danger')
                    }, 3000)
                }
                if (response.error) {
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
    } else {
        currentBrand = ""
        currentSize = ""
        currentColor = ""
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
//Get the cart data if the current user
function showCart() {
    let init = 0.00;
    if (!loginUser) {
        cartContainer.innerHTML = `<div class="emptyMessage">
                <p class="h5">Your cart is empty</p>
                <hr>
              </div>`;

        cartItems = ""

        total = init.toFixed(2)
    } else {
        shoesService
            .getCart(loginUser)
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let total = response.total
                let cartItems = response.cartItems
                if (cartItems === 0) {
                    cartItems = ""
                }

                if (cartItems) {
                    let html = cartTemplateInstance({
                        cart: data
                    });
                    let shoesHTML = html;
                    cartContainer.innerHTML = shoesHTML;
                } else {
                    cartContainer.innerHTML = `<div class="emptyMessage">
                <p class="h5">Your cart is empty</p>
                <hr>
              </div>`;
                }

                totalItems.innerHTML = cartItems
                amountTotal.innerHTML = total
            });
    }

}
//Create a function that will validate the form before sending the data to the server
async function addUserSignUp(name, password, surname, email) {
    if (name === "") {
        signUpmess.classList.add("text-danger")
        signUpmess.innerHTML = "Please enter Name"
        setTimeout(() => {
            signUpmess.innerHTML = ""
            signUpmess.classList.remove("text-danger")
        }, 3000)

    } else if (password === "") {
        signUpmess.classList.add("text-danger")
        signUpmess.innerHTML = "Please enter Password"
        setTimeout(() => {
            signUpmess.innerHTML = ""
            signUpmess.classList.remove("text-danger")
        }, 3000)

    } else if (surname === "") {
        signUpmess.classList.add("text-danger")
        signUpmess.innerHTML = "Please enter Surname"
        setTimeout(() => {
            signUpmess.innerHTML = ""
            signUpmess.classList.remove("text-danger")
        }, 3000)

    } else if (email === "") {
        signUpmess.classList.add("text-danger")
        signUpmess.innerHTML = "Please enter Email"
        setTimeout(() => {

            signUpmess.innerHTML = ""
            signUpmess.classList.remove("text-danger")
        }, 3000)

    } else {
        await shoesService.signUp(name, password, surname, email)
            .then((results) => {
                let response = results.data;
                Rstatus = response.status
                if (response.error) {
                    signUpmess.classList.add("text-danger")
                    signUpmess.innerHTML = "User already exists"
                    setTimeout(() => {
                        signUpmess.innerHTML = ""
                        signUpmess.classList.remove("text-danger")
                    }, 3000)
                }

                if (response.status === 'success') {
                    signUpmess.classList.add("text-green")
                    signUpmess.innerHTML = 'User successfully added'
                    setTimeout(() => {
                        signUpmess.innerHTML = ""
                        signUpmess.classList.remove("text-green")
                    }, 3000)
                }

            })
    }


}
//Create a function that willl validate login data of user before sending it to the server
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
                if (response.role === 'admin') {
                    localStorage.setItem("roleUser", response.role);
                    addShoeCanvasButton.style.display = 'flex'
                }


                if (response.error) {
                    loginMess.innerHTML = response.error
                    setTimeout(() => {
                        loginMess.innerHTML = ""
                    }, 3000)
                    return
                }
                if (response.status === 'success') {
                    localStorage.setItem("loginUser", name);
                    logoutElem.classList.add('logoutIcon')
                    logoutElem.innerHTML = `<i class="bi bi-box-arrow-left " id="logoutIcon">${localStorage.getItem("loginUser")}</i>`
                    bootstrapLoginModal.click()
                    location.reload()

                }
            })
    }
}
//call the cart info function
showCart()

//if the user is not admin log user in
if (!roleUser) {
    showShoes()
}

//Create a function that will get the admin info from the server function if the user is an admin
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
            productLink.style.display = 'none'
            contactsSection.style.display = 'none'
            contactNavElem.style.display = 'none'
        });


}

//if the user is admin show them the user orders
if (roleUser) {
    showOrders()
}

//Get the data from the signup form if the submit button is pressed
signUpButton.addEventListener('click', function (click) {
//validate if the email entered is of valid format
    if (SignUpEmail.validity.typeMismatch && click) {
        signUpmess.classList.add("text-danger")
        signUpmess.innerHTML = "Please enter a valid email address!"
        setTimeout(() => {
            signUpmess.innerHTML = ""
            signUpmess.classList.remove("text-danger")
        }, 3000)
        SignUpUsername.value = ""
        SignUpPassword.value = ''
        surname.value = ""
        SignUpEmail.value = ''
        return;
    } else if (SignUpPassword.value != "") {
        email.setCustomValidity("");
        addUserSignUp(SignUpUsername.value, SignUpPassword.value, surname.value, SignUpEmail.value)
        SignUpUsername.value = ""
        SignUpPassword.value = ''
        surname.value = ""
        SignUpEmail.value = ''

    }

})
//get the data from the login form the the function that will log the user in
logInButton.addEventListener('click', function () {

    userLogin(loginUsername.value, loginPassword.value)
    loginUsername.value = ""
    loginPassword.value = ''
})
//A function that will add a shoe that the user wanted to the cart
async function addToCart(id) {
    await shoesService.addToCart(loginUser, id)
        .then((results) => {
            let response = results.data;

            if (response.error) {
                console.log(response.error)
                cartErrorElem.classList.add('text-danger')
                cartErrorElem.innerHTML = response.error
                setTimeout(() => {
                    cartErrorElem.innerHTML = ""
                    cartErrorElem.classList.remove('text-danger')
                }, 3000)
                if (!loginUser) {
                    cartErrorElem.innerHTML = ""
                    loginButtonModal.click()
                }

            }
        })
    showShoes(currentBrand, currentSize, currentColor)
    showCart()

}
// A function that will remove a shoe from the cart
async function deleteFromCart(id, qty) {
    await shoesService.deleteCartItem(loginUser, id, qty);

    showShoes(currentBrand, currentSize, currentColor);
    showCart();

}
//A function that will chechout the cart for the user
async function chechoutFromCart() {

    if (parseFloat(amountTotal.innerHTML) !== 0.00) {
        if (paymentAmount.value > parseFloat(amountTotal.innerHTML)) {
            await shoesService.checkoutCartItem(loginUser)
                .then((results) => {
                    const response = results.data;
                    if (response.error) {
                        cartErrorElem.innerHTML = response.error
                        setTimeout(() => {
                            cartErrorElem.innerHTML = ""
                        }, 3000)
                        if (!loginUser) {
                            loginButtonModal.click()
                        }

                    } else {
                        cartErrorElem.classList.add('text-green')
                        cartErrorElem.innerHTML = "Checkout Succesfull shoe will be dilivered within 7 bussines days"
                        setTimeout(() => {
                            cartErrorElem.innerHTML = ""
                            cartErrorElem.classList.remove('text-green')
                        }, 3000)
                        if (!loginUser) {
                            loginButtonModal.click()
                        }
                    }
                });
            showShoes(currentBrand, currentSize, currentColor);
            showCart();
            if ((paymentAmount.value - parseFloat(amountTotal.innerHTML)) > 0) {
                cartErrorElem.classList.add('text-green')
                cartErrorElem.innerHTML = `Payment Successsfull <br> Your change is ${(paymentAmount.value - parseFloat(amountTotal.innerHTML)).toFixed(2)}`
                setTimeout(() => {
                    cartErrorElem.innerHTML = ""
                    cartErrorElem.classList.remove('text-green')
                }, 3000)
            }
            paymentAmount.value = ''
        } else if (paymentAmount.value == parseFloat(amountTotal.innerHTML)) {
            await shoesService.checkoutCartItem(loginUser)
                .then((results) => {
                    const response = results.data;
                    if (response.error) {
                        cartErrorElem.innerHTML = response.error
                        setTimeout(() => {
                            cartErrorElem.innerHTML = ""
                        }, 3000)
                        if (!loginUser) {
                            loginButtonModal.click()
                        }

                    } else {
                        cartErrorElem.classList.add('text-green')
                        cartErrorElem.innerHTML = "Checkout Succesfull shoe will be dilivered within 7 bussines days"
                        setTimeout(() => {
                            cartErrorElem.innerHTML = ""
                            cartErrorElem.classList.remove('text-green')
                        }, 3000)
                        if (!loginUser) {
                            loginButtonModal.click()
                        }
                    }
                });
            showShoes(currentBrand, currentSize, currentColor);
            showCart();
            paymentAmount.value = ''
        } else {
            cartErrorElem.classList.add('text-danger')
            cartErrorElem.innerHTML = `Payment Failed!!! <br> Payment amout not enough`
            setTimeout(() => {
                cartErrorElem.innerHTML = ""
                cartErrorElem.classList.remove('text-danger')
            }, 3000)
        }
    } else {
        cartErrorElem.classList.add('text-danger')
        cartErrorElem.innerHTML = `Please add shoes to cart`
        setTimeout(() => {
            cartErrorElem.innerHTML = ""
            cartErrorElem.classList.remove('text-danger')
        }, 3000)
        paymentAmount.value = ''

    }


}


//Log the user out from the site
function logoutUser() {
    if (!confirm("You are about to logout")) {
        return;
    } else {
        logoutElem.innerHTML = '<i data-bs-toggle="modal" data-bs-target="#loginModal" class="bi bi-person-circle"></i>'
        localStorage.removeItem("loginUser");
        localStorage.removeItem("roleUser");
        location.reload()
    }

}
//Get the filter button info to the request
filterButton.addEventListener("click", () => {

    if (!selectBrandElem.value && !selectSizeElem.value && !selectColorNav.value) {
        errorSelect.innerHTML = "Please select Brand or Size or Size"
        setTimeout(() => {
            errorSelect.innerHTML = ""
        }, 3000)
    } else {
        showShoes(selectBrandElem.value, selectSizeElem.value, selectColorNav.value)
        backNavButton.style.display = "flex";
    }

})
//Function for admin to clear all the orders
function clearAdminCartHistory() {
    if (!confirm("You are about to clear the whole cart history")) {
        return;
    } else {
        shoesService.clearCartHistory()
            .then((results) => {
                const responce = results.data
                if (responce.error) {
                    console.error(responce.error)
                }

            })
        showOrders()
    }
}
//A function to get all the shoes if a user removes filter
backNavButton.addEventListener("click", () => {
    showShoes()
    backNavButton.style.display = "none"
})
//Get the information of the shoe from the admin add shoe validate it and send to the server
addShoeButton.addEventListener("click", async function () {
    if (nameofShoe.value === "" && colorOfshoe.value === "" && brandofShoe.value === "" && photoofShoe.value === "" && priceofShoe.value === "" && sizeofShoe.value === "" && stockofShoe.value === "") {
        messageElem.classList.add("text-danger")
        messageElem.innerHTML = `Please enter Shoe`
        setTimeout(function () {
            messageElem.classList.remove("text-danger")
            messageElem.innerHTML = ""
        }, 6000);
    } else {
        if (nameofShoe.value === "") {
            messageElem.classList.add("text-danger")
            messageElem.innerHTML = `Please Enter Name of shoe`
            setTimeout(function () {
                messageElem.classList.remove("text-danger")
                messageElem.innerHTML = ""
            }, 6000);
        } else if (brandofShoe.value === "") {
            messageElem.classList.add("text-danger")
            messageElem.innerHTML = `Please Enter Brand of shoe`
            setTimeout(function () {
                messageElem.classList.remove("text-danger")
                messageElem.innerHTML = ""
            }, 6000);
        } else if (photoofShoe.value === "") {
            messageElem.classList.add("text-danger")
            messageElem.innerHTML = `Please Enter Photo URL of shoe`
            setTimeout(function () {
                messageElem.classList.remove("text-danger")
                messageElem.innerHTML = ""
            }, 6000);
        } else if (priceofShoe.value === "") {
            messageElem.classList.add("text-danger")
            messageElem.innerHTML = `Please Enter Price of shoe`
            setTimeout(function () {
                messageElem.classList.remove("text-danger")
                messageElem.innerHTML = ""
            }, 6000);
        } else if (sizeofShoe.value === "") {
            messageElem.classList.add("text-danger")
            messageElem.innerHTML = `Please Enter Size of shoe`
            setTimeout(function () {
                messageElem.classList.remove("text-danger")
                messageElem.innerHTML = ""
            }, 6000);
        } else if (stockofShoe.value === "") {
            messageElem.classList.add("text-danger")
            messageElem.innerHTML = `Please Enter Stock of shoe`
            setTimeout(function () {
                messageElem.classList.remove("text-danger")
                messageElem.innerHTML = ""
            }, 6000);
        } else {

            await shoesService.addShoe(
                {
                    shoe_name: nameofShoe.value,
                    shoe_picture: photoofShoe.value,
                    shoe_color: colorOfshoe.value,
                    price: priceofShoe.value,
                    stock: stockofShoe.value,
                    brand_id: parseFloat(brandofShoe.value),
                    shoe_size: sizeofShoe.value
                })
                .then((results) => {
                    let response = results.data;
                    console.log(response.status)
                    if (response.status === 'success') {
                        messageElem.classList.add("text-green")
                        messageElem.innerHTML = "Shoe Succesfully Added"
                        setTimeout(function () {
                            messageElem.classList.remove("text-green")
                            messageElem.innerHTML = ""
                        }, 6000);
                    }
                })


            nameofShoe.value = "";
            colorOfshoe.value = "";
            brandofShoe.value = "";
            photoofShoe.value = "";
            priceofShoe.value = "";
            sizeofShoe.value = "";
            stockofShoe.value = "";
        }

    }

})
