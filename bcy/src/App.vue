<template>
  <router-view/>
</template>

<script>
export default {
created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
}
</script>
<style lang="scss">
body{
  background: #f5f5f5;
}
</style>
