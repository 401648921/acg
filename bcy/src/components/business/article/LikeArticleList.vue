<template>
  <div class="card-list">
    <div class="element" v-for="i in 3" :key="i">
      <article-card></article-card>
    </div>
  </div>
</template>

<script>
import articleCard from '../article/ArticleCard.vue'
export default {
  components:{
    articleCard
  }
}
</script>

<style scoped>
</style>
