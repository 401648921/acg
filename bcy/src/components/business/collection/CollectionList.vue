<template>
  <div class="list">
    <div v-for="i in 4" :key="i" class="element">
      <collection-card></collection-card>
    </div>
  </div>
</template>

<script>
import collectionCard from '../collection/CollectionCard.vue'
export default {
  components:{
    collectionCard
  }
}
</script>

<style scoped>
.element{
  border-bottom: #d1d1d1 solid 1px;
}
</style>
