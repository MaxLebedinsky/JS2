<template>
  <div>
    <div class="layover" @click="cartCloseClickHandler"></div>
    <div class="cart">
      <h2>Корзина</h2>
      <button class="cart-close-button" @click="cartCloseClickHandler">
        X
      </button>
      <div class="cart-item" v-for="item in items" :key="item.id">
        <p>
          <span>{{ item.product_name }}</span> Цена: ${{ item.price }} Скидка:
          {{ item.discount }}% Стоимость: ${{ calcActualPrice(item) }}
        </p>
      </div>
      <div class="cart-total">
        <h3 v-if="items.length">Итого: ${{ calcCartTotal }}</h3>
        <h3 v-else>Корзина пуста</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  methods: {
    calcActualPrice(item) {
      return Math.round((item.price / 100) * (100 - item.discount));
    },
    cartCloseClickHandler() {
      this.$emit("closeClick");
    },
  },
  computed: {
    calcCartTotal: {
      get: function () {
        return this.items.reduce((total, current) => {
          return (total += this.calcActualPrice(current));
        }, 0);
      },
      set: function () {},
    },
  },
};
</script>


<style>
.layover {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}

.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  position: absolute;
  left: 25%;
  top: 15%;
  border: 1px solid black;
  border-radius: 15px;
  text-align: center;
  background-color: whitesmoke;
  width: 50%;
  z-index: 10;
}

.cart-close-button {
  padding: 0 5px;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>