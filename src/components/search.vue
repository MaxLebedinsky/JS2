<template>
  <form>
    <input type="text" class="goods-search" v-model="searchLine" />
    <button type="button" class="search-button" @click="filterGoods">
      Поиск
    </button>
  </form>
</template>

<script>
export default {
  props: {
    goodsToFilter: Array,
  },

  data() {
    return {
      searchLine: "",
    };
  },

  computed: {
    searchResult: {
      get: function () {
        return this.goodsToFilter.filter((good) =>
          RegExp(this.searchLine, "i").test(good.product_name)
        );
      },
      set: function () {},
    },
  },

  methods: {
    filterGoods() {
      this.$emit("click", this.searchResult);
    },
  },
};
</script>

<style>
.goods-search {
  margin: 0 15px 0 0;
  height: 20px;
  width: 200px;
  padding: 0 5px;
}
</style>