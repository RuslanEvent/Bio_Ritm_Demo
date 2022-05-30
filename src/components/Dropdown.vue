<template>
  <button
    @click="show = !show"
    class="flex items-center p-2 text-indigo-100 bg-indigo-600 rounded-md button_down"
  >
    <svg
      class="w-5 h-5 text-indigo-100 dark:text-white down_list dropdown-button-not-click"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
      class="dropdown-button-not-click"
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div
    v-show="show"
    @click="shows"
    class="absolute right-0 py-2 mt-2 bg-indigo-500 rounded-md shadow-xl w-44 down_menu"
  >
    <router-link class="profil"
          v-if="$store.getters.currentRole == 'admin'"
          :to="{ name: 'EditUsers' }"
          >Редактировать</router-link
        >
        <router-link @click="onLogout" :to="{ name: 'EditUsers' }">
          Выход
        </router-link>
        <!-- <input type="submit" class="" value="Logout"  /> -->
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("userLogout").then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
  created() {
    let component = this;
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('dropdown-button-not-click')) {
        return;
      }
      component.show = false;
    })
  }
};
</script>