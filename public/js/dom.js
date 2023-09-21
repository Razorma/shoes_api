
const orderCart = document.querySelector(".cart")
const openCartElem = document.querySelector(".openCart")
const closeCart = document.querySelector(".closeCart")

openCartElem.addEventListener("click", function () {
    orderCart.style.right = "0";
})
closeCart.addEventListener("click", function () {
    orderCart.style.right = "-600px";
})
