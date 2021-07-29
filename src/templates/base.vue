<template>
  <div class="page">
    新的页面
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    created () {
      this.some();
    },
    methods: {
      some() {
        console.log(some);
      },
    },
  }
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  height: 100%;
}
</style>