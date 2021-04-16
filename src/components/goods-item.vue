<template>
  <div class="goods-item">
    <img src="http://dummyimage.com/150x200" alt="item" />
    <h3>{{ good.product_name }}</h3>
    <p>
      Price: <span>{{ good.price }}</span>
    </p>
    <button
      class="add-to-cart-button"
      type="button"
      @click="addClickHandler(good)"
    >
      Добавить в корзину
    </button>
  </div>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addClickHandler(good) {
      this.$emit("addClick", good);
    },
  },
};
</script>

<style>
.goods-item {
  width: 200px;
  min-height: 300px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 20px 15px;
  box-sizing: border-box;
  margin: 0 20px 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.goods-item h3 {
  color: black;
  margin-top: 20px;
}

.goods-item p {
  color: orange;
  margin-top: 15px;
  color: darkgray;
  font-size: 16px;
}

.goods-item span {
  color: orange;
  font-weight: bold;
}
</style>