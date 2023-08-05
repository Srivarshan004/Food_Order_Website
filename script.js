const filterBtn = document.querySelectorAll('.btn');
const foodBox = document.querySelectorAll('.food-box');
const searchBox = document.querySelector('#search');

/*----Search Product by Sarchbox----*/

searchBox.addEventListener('keyup',(input)=>{
    searchText = input.target.value.toLowerCase().trim();
    //console.log(searchText);
    foodBox.forEach((box)=>{
        const data = box.dataset.item;
        if(data.includes(searchText)){
            box.style.display='block';
        } else {
            box.style.display='none';
        }
    });
    filterBtn.forEach((button)=>{
        button.classList.remove('button-clicked');
    });
    filterBtn[0].classList.add('button-clicked');
})

/*----Product Filter by Button----*/

filterBtn.forEach((button)=>{
    button.addEventListener('click',(event)=>{
        event.preventDefault();
        setActiveBtn(event);
        const btnFilter = event.target.dataset.filter;

        foodBox.forEach((box=>{
            if(btnFilter=='all'){
                box.style.display='block';
            } else {
                const boxFilter = box.dataset.item;
                if(btnFilter==boxFilter){
                    box.style.display='block'; 
                } else {
                    box.style.display='none';
                }
            }
        }));
    })
})

function setActiveBtn(event){
    filterBtn.forEach((button)=>{
        button.classList.remove('button-clicked');
    });
    event.target.classList.add('button-clicked');
}

/*------Side Cart------*/

const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
};

function loadContent(){
    //Remove Item from Cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });  

    //Item Quantity Change Event
    let qtyElements = document.querySelectorAll('.cart-qty');
    qtyElements.forEach((input)=>{
        input.addEventListener('click',changeQty);
    });

    //Product Cart
    let cartBtn = document.querySelectorAll('.add-cart');
    cartBtn.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });


    updateTotal();
}
 
let itemList=[];
//console.log(itemList);

//Remove Item
function removeItem(){
    if(confirm('Are You Sure To Remove Item')){
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(elementList=>elementList.title!=title);
        this.parentElement.remove();
        loadContent();
    }
}

//Change Quantity
function changeQty(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    } 
    loadContent();
}

//Add Cart
function addCart(){
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;
    let Id = food.querySelector('.food-id').innerHTML;
    //console.log(title,price,imgSrc,foodId);

    let newProduct = {title,price,imgSrc,Id}
    //console.log(newProduct);

    //Check Product already Exist in Cart
    if(itemList.find((el)=>el.Id==newProduct.Id)){
        alert("This Product is Already added in Cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title,price,imgSrc,Id);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    //console.log(cartBasket)
    loadContent();
}

function createCartProduct(title,price,imgSrc,Id){
    return `<div class="cart-box">
                <img src="${imgSrc}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-food-title">${title}</div>
                    <div class="food-id">${Id}</div>
                    <div class="price-box">
                        <div class="cart-price">${price}</div>
                        <div class="cart-amt">${price}</div>
                    </div>
                    <input type="number" value="1" class="cart-qty">
                </div>
                <ion-icon name="trash" class="cart-remove"></ion-icon>
            </div>`
}

function updateTotal(){
    const cartItem = document.querySelectorAll('.cart-box');
    const totalPrice = document.querySelector('.total-price');
    
    let total = 0;

    cartItem.forEach(product=>{
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.",""));
        //console.log(price);
        let qty = product.querySelector('.cart-qty').value;
        total = total+(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty)+".00";
    });

    totalPrice.innerHTML="Rs."+total+".00";

    // Add Product Count in Cart Icon

    const cartCount = document.querySelector('.cart-count');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if(count==0){
        cartCount.style.display='none';
    } else {
        cartCount.style.display='block';
    }
}

/*----------------Place Your Order--------------*/

const orderbtn = document.querySelector('.btn-buy');
orderbtn.addEventListener('click',()=>{
    if(confirm('Ary you sure to place your Order!')){
        alert('Your Order Is Placed.')
    }
})