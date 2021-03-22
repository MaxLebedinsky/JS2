'use strict';

const goods = [
    { title: 'Snowboard', price: 500 },
    { title: 'Helmet', price: 100 },
    { title: 'Bindings', price: 200 },
    { title: 'Boots', price: 300 },
];

// const renderGoodsItem = (title, price) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
//   };

// В функции renderGoodsItem можно убрать фигурные скобки и return

const renderGoodsItem = (title = 'Default name', price = 0) => `<div class="goods-item"><img src="http://dummyimage.com/150x200" alt="item"><h3>${title}</h3><p>Price: <span>$${price}<span></p></div>`;

// const renderGoodsList = (list) => {
//     let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
//     document.querySelector('.goods-list').innerHTML = goodsList;
//   }

// В функции renderGoodsList можно убрать скобки вокруг единственного аргумента list и переписать тело в одну строку (не объявляя переменную goodsList), это позволит убрать фигурные скобки

// Задание 3*: Запятые выводятся потому, что в innerHTML записывается строка, сделанная из массива list.map, а в виде строки содержимое массивов выводится через запятую. Исправить это можно с помощью метода join('').


const renderGoodsList = list => document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join('');

renderGoodsList(goods);
