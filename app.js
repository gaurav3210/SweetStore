// show cart

(function(){
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    })
})();

// add items to cart

(function(){
    const cartBtn = document.querySelectorAll('.store-item-icon');

    cartBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){

            if (event.target.parentElement.classList.contains('store-item-icon')){
                let path = event.target.parentElement.previousElementSibling.src;
                let pos = path.indexOf('img');
                let slicepath = path.slice(pos+3);

                const item = {};
                item.img = `img-cart${slicepath}`;/
                //console.log(item.img);
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name = name;

                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent; // $ 10
                let cost = price.slice(2)

                item.cost = cost;

                const cartItem = document.createElement('div');
                cartItem.classList.add(
                    'cart-item',
                    'd-flex',
                    'justify-content-between',
                    'text-capitalize',
                    'my-3'
                );

                cartItem.innerHTML = `
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">
            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
            <span>$</span>
            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.cost}</span>
          </div>
          <a href="#" id='cart-item-remove' class="cart-item-remove">
            <i class="fas fa-trash"></i>
          </a>
        </div>
`;

                // select cart
                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');

                cart.insertBefore(cartItem, total);
                alert('Item added to the cart');
                showTotals();
            }
        })
    })

    // show totals
    function showTotals(){
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');

        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        });

        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        },0)

        const Money = totalMoney.toFixed(2);

        document.getElementById('cart-total').textContent = Money;
        document.querySelector('.item-total').textContent = Money;
        document.getElementById('item-count').textContent = total.length;
    }
})();