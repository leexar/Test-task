<template>
  <div id="app">
    <header>
      <router-link to="/home">
        Home
      </router-link>
      <router-link to="/add">
        Add
      </router-link>
    </header>
    <div class="wrapper">
      <router-view class="container"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
a {
  text-decoration: none;
  color: #2c3e50;
}
a:visited {
  color: #2c3e50;
}
li {
  margin-bottom: 5px;
}
header {
  height: 60px;
  background-color: #3066be;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
}
header a {
  color: white;
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
header a:first-child {
  border-right: 1px solid white;
}
header a:visited {
  color: white;
}
header a:hover {
  background-color: rgb(106, 169, 224);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.wrapper {
  margin-top: 70px;
  display: flex;
  justify-content: center;
}
.container {
  width: 360px;
}
</style>
