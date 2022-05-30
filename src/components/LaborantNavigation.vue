<template>
  <div class="admin_navigation_caontainer">
    <div class="admin_navigation">
      <div class="admin_navigation_right">
        <div><router-link to="/admin/process">Процесс</router-link></div>
      </div>
    </div>
  </div>

  <router-view></router-view>

</template>

<script>

export default {
  name: "AdminNavigation",

};
</script>