<template>
  <div class="home">
    <h1>Это главная страница приложения</h1>
    <div class="nav_bar">
      <h2>
        <router-link to="/posts">Посты</router-link>
      </h2>
      <my-button @click="$router.push('/posts')">Посты</my-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>
  .nav_bar {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
</style>
