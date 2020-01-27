<template>
  <div class="recipe">
    <div class="recipe__name">
      {{ Recipe.name }}
    </div>
    <div class="recipe__time">cooking time: <span>14 min.</span></div>
    <div class="recipe__photo">
      <div>
        Place for a photo.
      </div>
    </div>
    <div class="recipe__description">
      {{ Recipe.description }}
    </div>
    <div class="recipe__ingredients">
      <div class="sub_title">
        Ingredients
      </div>
      <ul>
        <li v-for="(ing, index) in Recipe.ingredients" :key="`ing#${index}`">
          {{ ing.ingredient }}
        </li>
      </ul>
    </div>
    <div class="recipe__instructions">
      <div class="sub_title">
        Instructions
      </div>
      {{ Recipe.instructions }}
    </div>

    <div class="recipe__history">
      <div class="sub_title" @click="togleHistory">
        Recipe history <span class="history_arrow"> &gt; </span>
      </div>
      <div class="recipe__history_items" v-show="showHistory">
        <div v-if="History.length == 0" v-show="loadedHistory">
          Nothing to show. Recipe has been never changed.
        </div>
        <div v-else v-for="(change, index) in History" :key="`change#${index}`">
          <div class="history_date">
            Before
            <span class="colored">
              {{ new Date(change.date).toLocaleDateString("us-US", options) }}
            </span>
            :
          </div>
          <div v-if="change.changes.name">
            <div class="colored">
              Name:
            </div>
            <div>
              {{ change.changes.name }}
            </div>
          </div>
          <div v-if="change.changes.ingredients">
            <div class="colored">
              Ingredients:
            </div>
            <div>
              <ul>
                <li
                  v-for="(ing, index) in change.changes.ingredients"
                  :key="`changeIng#${index}`"
                >
                  {{ ing.ingredient }}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="change.changes.instructions">
            <div class="colored">
              Instructions:
            </div>
            <div>
              {{ change.changes.instructions }}
            </div>
          </div>
          <div v-if="change.changes.description">
            <div class="colored">
              Description:
            </div>
            <div>
              {{ change.changes.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recipe",
  data() {
    return {
      options: { year: "numeric", month: "numeric", day: "numeric" },
      showHistory: false,
      loadedHistory: false,
      Recipe: {},
      History: []
    };
  },
  methods: {
    togleHistory() {
      window.axios
        .get(`http://localhost:3000/history/${this.Recipe.id}`)
        .then(response => {
          this.History = response.data.history;
          this.loadedHistory = true;
        })
        .catch(error => {
          console.log(error);
        });
      let historyBlock = document.querySelector(".recipe__history");
      if (!this.showHistory) {
        historyBlock.setAttribute("opened", "");
        this.showHistory = true;
      } else {
        historyBlock.removeAttribute("opened");
        this.showHistory = false;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    window.axios.get("http://localhost:3000/" + to.params.id).then(response => {
      next(vm => (vm.Recipe = response.data.recipe));
    });
  }
};
</script>

<style>
.recipe {
  text-align: center;
}
.recipe div:not(:first-child) {
  margin-bottom: 20px;
}
.recipe__name {
  font-size: 2em;
}
.recipe__time {
  font-size: 0.8em;
  color: rgb(160, 150, 150);
}
.recipe__photo {
  width: 100%;
  height: 320px;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: center;
}
.recipe__ingredients ul {
  text-align: left;
}
.recipe__history .sub_title {
  cursor: pointer;
}
.recipe__history .history_arrow {
  transform: rotate(90deg);
  display: block;
}
.recipe__history[opened] .history_arrow {
  transform: rotate(270deg);
}
.recipe__history_items {
  text-align: left;
  font-size: 0.9em;
}
.sub_title {
  font-size: 1.3em;
  color: #119da4;
}
.history_date{
  font-size: 1.1em;
}
.colored {
  color: #119da4;
}
</style>
