<template>
  <!-- <MainLayout :bg="'login_page'"></MainLayout> -->
  <LoginPage />
</template>
<style scoped>

</style>

<script>
// import MainLayout from "@/layout/main_layout.vue";
import LoginPage from "@/components/LoginPage.vue";


export default {
   name: "Login",
   components: {
      LoginPage,
      // MainLayout,
   },
}
</script>