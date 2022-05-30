<template>
  <div class="admin_page">
    <div class="container">
      <UserNavbar />
      <div class="class_gray">
      <div id="admin_navigation">
        <AdminNavigation />
      </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavigation from "@/components/AdminNavigation.vue";
import UserNavbar from "@/components/UserNavbar.vue";

export default {
  name: "AdminPage",
  components: {
    AdminNavigation,
    UserNavbar,

  },

};
</script>
