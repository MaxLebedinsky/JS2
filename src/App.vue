<template>
  <div id="app">
    <header class="header wrapper">
      <Search :goodsToFilter="goods" @click="applySearchResult"></Search>
      <button class="cart-button" type="button" @click="showCart">
        Корзина
      </button>
      <Cart v-if="isVisibleCart" :items="cart" @closeClick="hideCart"></Cart>
    </header>
    <main>
      <GoodsList
        :goods="filteredGoods"
        @transferClick="addCartItem"
      ></GoodsList>
    </main>
  </div>
</template>

<script>
import GoodsList from "./components/goods-list";
import Search from "./components/search";
import Cart from "./components/cart";

export default {
  name: "App",
  data() {
    return {
      goods: [],
      filteredGoods: [],
      cart: [],
      isVisibleCart: false,
      URL: "https://my-json-server.typicode.com/MaxLebedinsky/myJSON/goods",
    };
  },

  components: {
    GoodsList,
    Search,
    Cart,
  },

  methods: {
    fetchGoods() {
      return fetch(this.URL)
        .then((response) => response.json())
        .then((response) => {
          this.goods = response;
          this.filteredGoods = response;
        });
    },

    applySearchResult(searchResult) {
      this.filteredGoods = searchResult;
    },

    showCart() {
      this.isVisibleCart = true;
    },

    hideCart() {
      this.isVisibleCart = false;
    },

    addCartItem(good) {
      this.cart.push(good);
    },
  },

  mounted() {
    this.fetchGoods();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background: whitesmoke;
}

button:active,
button:focus {
  border: none;
  outline: none;
}

.wrapper {
  width: 1200px;
  margin: 0 auto;
}

.header {
  margin-top: 15px;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: lightgrey;
  border-radius: 15px;
}

.cart-button,
.search-button,
.add-to-cart-button {
  margin: 0 15px 0 0;
  padding: 8px 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cart-button:hover,
.search-button:hover {
  background: white;
}

.add-to-cart-button {
  margin: 15px auto 0;
}

.add-to-cart-button:hover {
  background-color: orange;
  color: white;
}

.dummy {
  text-align: center;
  margin: 0 auto;
  width: 20%;
  height: 100px;
  padding-top: 35px;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
}

.cart h2 {
  margin-bottom: 20px;
}

.cart-item {
  background-color: white;
  outline: 1px solid gray;
  width: 90%;
  padding: 15px;
  text-align: left;
}

.cart-item span {
  font-weight: bold;
}

.cart-total {
  text-align: left;
  padding: 15px;
}
</style>
