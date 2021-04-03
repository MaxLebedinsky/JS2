'use strict';

const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';

new Vue({
    el: '#app',

    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false
    },

    methods: {
        fetchGoods(method, url, callback) {
            // let xhr = new XMLHttpRequest(); 
            // xhr.onreadystatechange = () => {
            //     if (xhr.readyState === 4 && xhr.status === 200) {
            //         this.goods = JSON.parse(xhr.responseText);
            //         callback(this.goods);
            //     }
            // }
            // xhr.open(method, url);
            // xhr.send();

            this.goods = [{
                    product_name: 'Snowboard',
                    price: 1500
                },
                {
                    product_name: 'Boots',
                    price: 500
                },
                {
                    product_name: 'Bindings',
                    price: 300
                },
                {
                    product_name: 'Helmet',
                    price: 200
                }
            ];

            callback(this.goods);
        },
        filterGoods(value) {
            const regExp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => {
                return regExp.test(good.product_name)
            });
        },
        searchClickHandler() {
            this.filterGoods(this.searchLine);
        },
        cartClickHandler() {
            this.isVisibleCart = true;
        },
        cartCloseClickHandler() {
            this.isVisibleCart = false;
        }
    },

    mounted() {
        this.fetchGoods('GET', URL, (arr) => {
            this.goods = arr;
            this.goods.forEach(item => this.filteredGoods.push(item));
        });
    }
});
