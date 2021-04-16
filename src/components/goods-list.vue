<template>
  <div class="goods-list">
    <GoodsItem
      v-for="good in goods"
      :good="good"
      :key="good.id"
      @addClick="transferGood"
    ></GoodsItem>
    <div class="dummy wrapper" v-if="!goods.length">
      <p>Нет данных</p>
    </div>
  </div>
</template>

<script>
import GoodsItem from "./goods-item";

export default {
  props: {
    goods: Array,
  },
  components: {
    GoodsItem,
  },
  methods: {
    transferGood(good) {
      this.$emit("transferClick", good);
    },
  },
};
</script>

<style>
.goods-list {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;
  padding-top: 20px;
}
</style>