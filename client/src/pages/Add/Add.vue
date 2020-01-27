/* eslint-disable no-undef */
<template>
  <div class="add">
    <div class="add__title">
      {{ recipe.id ? "Edit the recipe" : "Add a new recipe" }}
    </div>
    <div class="add__list">
      <div class="sub_title">
        Name*:
      </div>
      <div>
        <input type="text" v-model="recipe.name" />
      </div>
      <div class="sub_title">
        Description:
      </div>
      <div>
        <input type="text" v-model="recipe.description" />
      </div>
      <div class="sub_title">
        Ingredients*:
      </div>
      <div>
        <ul>
          <li
            v-for="(ing, index) in recipe.ingredients"
            :key="`ing#${index}`"
            :id="index"
          >
            <input type="text" v-model="recipe.ingredients[index].ingredient" />
          </li>
        </ul>
        <button @click="addNewIngredient" class="add__ingredient_btn">
          Add new ingredient
        </button>
      </div>
      <div class="sub_title">
        Instructions:
      </div>
      <div>
        <input type="text" v-model="recipe.instructions" />
      </div>
    </div>
    <div>
      <button class="add__ingredient_btn" @click="sendForm">
        {{ recipe.id ? "Edit" : "Add" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      recipe: {
        name: "",
        description: "",
        ingredients: [],
        instructions: ""
      }
    };
  },
  methods: {
    addNewIngredient() {
      this.recipe.ingredients.push({ ingredient: "" });
    },
    sendForm() {
      this.recipe.ingredients = this.recipe.ingredients.filter(
        el => el.ingredient !== ""
      );

      if (this.recipe.name === "" || this.recipe.ingredients.length < 1) {
        alert("Please fill all required fields");
      } else {
        if (this.recipe.id) {
          window.axios
            .put(`http://localhost:3000/${this.recipe.id}`, this.recipe)
            .then(response => {
              window.console.log(response);
              this.$router.push({ name: "home" });
            })
            .catch(error => {
              window.console.log(error);
              alert(error);
            });
        } else {
          window.axios
            .post("http://localhost:3000", this.recipe)
            .then(response => {
              window.console.log(response);
              this.$router.push({ name: "home" });
            })
            .catch(error => {
              window.console.log(error);
              alert(error);
            });
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.name === "edit") {
      window.axios
        .get("http://localhost:3000/" + to.params.id)
        .then(response => {
          next(vm => (vm.recipe = response.data.recipe));
        });
    } else {
      next();
    }
  }
};
</script>

<style>
.add > div {
  margin-bottom: 20px;
}
.add__title {
  font-size: 2em;
}
.add__list > div {
  margin-bottom: 5px;
}
input {
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.add__ingredient_btn {
  display: block;
  width: 100%;
  text-align: center;
  margin: 10px 0;
  background-color: #119da4;
  border: 1px solid #119da4;
  border-radius: 5px;
  color: white;
  padding: 5px 0;
  cursor: pointer;
}
.add__ingredient_btn:hover {
  background-color: #80ded9;
  border-color: #80ded9;
}
</style>
