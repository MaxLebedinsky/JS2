'use strict';

const URL = 'https://my-json-server.typicode.com/MaxLebedinsky/myJSON/goods'

Vue.component('goods-list', {
    props: {
        goods: Array,
        required: true
    },
    template: `
    <div class="goods-list wrapper">
        <goods-item v-for="good in goods" :good="good" :key="good.product_name"></goods-item>
        <div class="dummy wrapper" v-if="!goods.length">
        <p>Нет данных</p></div>
    </div>
    `
});

Vue.component('goods-item', {
    props: {
        good: {
            type: Object,
            required: true
        },
    },
    template: `
    <div class="goods-item">
        <img src="http://dummyimage.com/150x200" alt="item">
        <h3>{{ good.product_name }}</h3>
        <p>Price: <span>{{ good.price }}</span> </p>
        <button class="add-to-cart-button" type="button" 
        @click="addClickHandler(good)"
        >Добавить в корзину</button>
    </div>
    `,
    methods: {
        addClickHandler(good) {
            app.cart.push(good);
        }
    }
});

Vue.component('cart-comp', {
    props: {
        items: Array,
        required: true
    },

    template: `<div>
                <div class="layover" @click="cartCloseClickHandler"></div>
                <div class="cart">
                    <h2>Корзина</h2>
                    <button class="cart-close-button" 
                     @click="cartCloseClickHandler">X</button>
                    <div class="cart-item" v-for="item in items">
                    <p><span>{{ item.product_name }}</span> Цена: \${{ item.price }}
                    Скидка: {{ item.discount }}% Стоимость: \${{ calcActualPrice(item) }}</p>
                    </div>
                    <div class="cart-total">
                    <h3>Итого: \${{ calcCartTotal }}</h3>
                    </div>
                </div>
                
            </div>`,

    methods: {
        cartCloseClickHandler() {
            app.isVisibleCart = false;
        },
        calcActualPrice(item) {
            return Math.round(item.price / 100 * (100 - item.discount));
        },
        calcCartTotal() {
            return this.cart.reduce((total, current) => {
                return total += this.calcActualPrice(current)
            }, 0);
        }
    },

    computed: {
        calcCartTotal: {
            get: function () {
                return this.items.reduce((total, current) => {
                    return total += this.calcActualPrice(current)
                }, 0);
            },
            set: function () {}
        }
    }
});

Vue.component('search', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `<div>
    <input type="text" class="goods-search" v-model="searchLine"/>
        <button class="search-button" type="button" 
        v-on:click="searchClickHandler">Поиск</button>
    </div>`,

    methods: {
        searchClickHandler() {
            this.filterGoods(this.searchLine);
        },
        filterGoods(value) {
            const regExp = new RegExp(value, 'i');
            app.filteredGoods = app.goods.filter(good => {
                return regExp.test(good.product_name)
            });
        }
    }
});


const app = new Vue({
    el: '#app',

    data: {
        goods: [],
        filteredGoods: [],
        isVisibleCart: false,
        cart: [],
    },

    methods: {
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

            callback(this.goods);
        },
        cartClickHandler() {
            this.isVisibleCart = true;
        },
    },

    mounted() {
        this.fetchGoods('GET', URL, (arr) => {
            this.goods = arr;
            this.goods.forEach(item => this.filteredGoods.push(item));
        });
    }
});