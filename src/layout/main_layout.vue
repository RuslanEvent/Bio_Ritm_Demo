<template>
  <div :class="bg">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
  </div>

  <main>
    <slot></slot>
  </main>
</template>
<script>
export default {
  props: {
    bg: String,
  },
};
</script>
<style lang=""></style>