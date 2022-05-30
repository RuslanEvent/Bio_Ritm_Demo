<template>
  <div class="admin_page">
    <div class="container">
      <UserNavbar />
      <div class="class_gray">
        <div id="admin_navigation">
          <ClientsNavigation />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientsNavigation from "@/components/ClientsNavigation.vue";
import UserNavbar from "@/components/UserNavbar.vue";
export default {
  components: {
    ClientsNavigation,
    UserNavbar,
  },
  data() {
    return {
      date: "",
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("userLogout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>