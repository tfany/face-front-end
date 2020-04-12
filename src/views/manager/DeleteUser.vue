<template>
  <div>
    <DeleteOneGroup></DeleteOneGroup>
  </div>
</template>

<script>
  import DeleteOneGroup from "./DeleteOneGroup";
  export default {
    components: {DeleteOneGroup},
    props: {
      groupId: String
    },
    name: "DeleteUser"
  }
</script>

<style scoped>

</style>
