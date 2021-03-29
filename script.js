'use strict';

class Item {
    constructor(price, disc) {
        this.price = price;
        this.disc = disc; // скидка в процентах
    }

    get actualPrice() {
        return Math.round(this.price /100 * (100 - this.disc));
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
        <img src="http://dummyimage.com/150x200" alt="item"><h3>${this.title}</h3>
        <p>Price: <span>$${this.price}<span></p>
        </div>`;
    }
}

class GoodsList {
    constructor(goods = []) {
        this.goods = [1];
    }

    fetchGoods(method, url, callback) {
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.goods = JSON.parse(xhr.responseText);
                callback(this.goods);
            }
        }
        xhr.open(method, url);
        xhr.send();
    }

    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHTML += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHTML;
    }

    countTotalSum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price
        });
        return sum;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    // добавление элемента в корзину
    addItem(cartItem) {
        this.items.push(cartItem);
    }

    // удаление элемента из корзины
    deleteItem(index) {
        this.items.splice(index,1);
    }

    // очистка корзины
    clear() {}

    // подсчёт общей стоимости корзины
    countSum() {
        let cartSum = 0;
        this.items.forEach(item => cartSum += item.actualPrice);
        return cartSum;
    }

    getList () {
        return this.items.map(item => ` ${item.title}; Цена: $${item.price}; Скидка: ${item.disc}%; Стоимость: $${item.actualPrice}`);
    }

    // формирование итоговой строки корзины
    // 'В корзине ... товаров на сумму $...'
    createTotalLine() {}

    // 'отрисовка' корзины в разметке
    render() {}

}

class CartItem extends Item {
    constructor(product, disc = 0) {
        super(product.price, disc);
        this.price = product.price;
        this.disc = disc;
        this.title = product.product_name;
    }

    // подсчёт подытога по данной позиции корзины
    countSubtotal() {}

    // 'отрисовка' элемента корзины в разметке
    render() {}
}

const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';

window.onload = () => {
    const list = new GoodsList();
    list.fetchGoods('GET', URL, (arr) => {
            list.goods = arr;
            list.render();
            console.log(`Суммарная стоимость товаров: $${list.countTotalSum()}`);
 
            cartSomeOperations();
            
  
    });

    function cartSomeOperations() {
        const cart = new Cart();

        // добавляем в корзину 2 товара
        const cartItem1 = new CartItem(list.goods[0], 5);
        const cartItem2 = new CartItem(list.goods[1], 10);

        cart.addItem(cartItem1);
        cart.addItem(cartItem2);

        // выводим список товаров и общую стоимость корзины
        console.log(`В корзине: ${cart.getList()}`);
        console.log(`Общая стоимость корзины: $${cart.countSum()}`);

        // удаляем 1 товар
        cart.deleteItem(1);
        console.log('----- 1 good deleted:');

        // ещё раз выводим список товаров и общую стоимость корзины
        console.log(`В корзине: ${cart.getList()}`);
        console.log(`Общая стоимость корзины: $${cart.countSum()}`);
    }

    
    

    

        


    

    

    






    // // добавляем в корзину 3 товара
    // const cartItem1 = new CartItem(list.goods[0], 5);
    // const cartItem2 = new CartItem(list.goods[2], 10);
    // const cartItem3 = new CartItem(list.goods[3]);

    // cart.addItem(cartItem1);
    // cart.addItem(cartItem2);
    // cart.addItem(cartItem3);

    // // удаляем 1 товар
    // cart.deleteItem(1);

    // // выводим список товаров и общую стоимость корзины
    // console.log(cart.getList());
    // console.log(`Общая стоимость корзины: $${cart.countSum()}`);
}