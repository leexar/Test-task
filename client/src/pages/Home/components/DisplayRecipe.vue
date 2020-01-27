<template>
  <div class="home__recipe">
    <router-link class="home__recipe_info" :to="`recipe/${Recipe.id}`">
      <div class="home__recipe_main">
        <div>
          {{ Recipe.name }}
        </div>
        <div>
          {{ new Date(Recipe.created).toLocaleDateString("us-US", options) }}
        </div>
      </div>
      <div class="home__recipe_desc">
        {{ Recipe.description }}
      </div>
    </router-link>
    <div class="home__recipe_settings">
      <div class="home__recipe_settings_edit" @click="Edit">
        Edit
      </div>
      <div class="home__recipe_settings_delete" @click="Delete">
        Delete
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: { year: "numeric", month: "numeric", day: "numeric" }
    };
  },
  props: {
    Recipe: Object
  },
  methods: {
    Delete() {
      window.axios
        .delete(`http://localhost:3000/${this.Recipe.id}`)
        .then(response => {
          window.console.log(response);
          this.$router.go();
        })
        .catch(error => {
          window.console.log(error);
          alert(error);
        });
    },
    Edit() {
      this.$router.push(`/edit/${this.Recipe.id}`);
    }
  }
};
</script>

<style>
.home__recipe {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 5px;
}
.home__recipe_info {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 0;
}
.home__recipe_info:hover {
  background-color: rgba(100, 149, 237, 0.15);
}
.home__recipe_main {
  margin-right: 10px;
}
.home__recipe_settings {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  padding: 5px 0;
}
.home__recipe_settings div {
  padding: 5px;
  cursor: pointer;
  flex: 1;
  text-align: center;
}
.home__recipe_settings div:first-child {
  border-right: 1px solid #ccc;
}
.home__recipe_settings_edit:hover {
  background-color: rgba(128, 222, 217, 0.3);
}
.home__recipe_settings_delete:hover {
  background-color: rgba(178, 34, 34, 0.3);
}
</style>
