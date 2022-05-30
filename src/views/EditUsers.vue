<template>
  <div>
    <EditAdmin />
  </div>
  <div>
    <EditUsers />
  </div>
</template>

<script>
import EditAdmin from "@/components/EditAdmin.vue";
import EditUsers from "@/components/EditUsers.vue";
export default {
  components: {
    EditAdmin,
    EditUsers,
  },
};
</script>