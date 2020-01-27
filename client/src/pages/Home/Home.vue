<template>
  <div>
    <display
      v-for="(item, index) in list"
      :Recipe="item"
      :key="`Recipe#${index}`"
    ></display>
  </div>
</template>

<script>
import Display from "./components/DisplayRecipe";

export default {
  data() {
    return {
      list: null
    };
  },
  name: "home",
  created() {
    window.axios
      .get("http://localhost:3000")
      .then(response => {
        this.list = response.data.recipies;
      })
      .catch(error => {
        window.console.log(error);
      });
  },
  components: {
    Display
  }
};
</script>

<style></style>
