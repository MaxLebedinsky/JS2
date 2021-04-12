<template>
  <div id="hello">
    <h3 id="title" class="green">{{ text }}</h3>
    <button id="btn" @click="buttonHandler" class="green">Paint It Red</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      text: "Welcome Max",
      color: "Green",
    };
  },
  methods: {
    buttonHandler() {
      const title = document.getElementById("title");
      const btn = document.getElementById("btn");
      title.classList.toggle("red");
      btn.classList.toggle("red");
      btn.innerText = `Paint It ${this.color}`;
      if (this.color === "Green") {
        this.color = "Red";
      } else {
        this.color = "Green";
      }
    },
  },
};
</script>

<style>
#hello {
  text-align: center;
}

.green {
  color: forestgreen;
}

.red {
  color: red;
}
</style>