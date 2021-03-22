'use strict';

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
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Snowboard', price: 500 },
            { title: 'Helmet', price: 100 },
            { title: 'Bindings', price: 200 },
            { title: 'Boots', price: 300 }
        ];
    }
    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHTML += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHTML;
    }

    // Задание 2: метод, считащий суммарную стоимость всех товаров
    countTotalSum() {
        let sum = 0;
        this.goods.forEach(good => { sum += good.price });
        return sum;
    }
}

// Задание 1: классы корзины и элемента корзины
class Cart {
    constructor() {
        // массив элементов корзины
        this.items = [];
    }

    // добавление элемента в корзину
    addItem() { }

    // удаление элемента из корзины
    deleteItem() { }

    // очистка корзины
    clear() { }

    // подсчёт общей стоимости корзины
    countCartSum() { }

    // формирование итоговой строки корзины
    // 'В корзине ... товаров на сумму $...'
    createTotalLine() { }

    // 'отрисовка' корзины в разметке
    render() { }

}

class CartItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        // кол-во данного товара в корзине
        this.quantity = 0;
    }

    // подсчёт подытога по данной позиции корзины
    countSubtotal() { }

    // 'отрисовка' элемента корзины в разметке
    render() { }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(`Суммарная стоимость товаров: $${list.countTotalSum()}`);

