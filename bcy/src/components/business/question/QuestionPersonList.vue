
<template>
  <div class="card-list">
    <div class="element" v-for="i in 3" :key="i">
      <question-card></question-card>
    </div>
  </div>
</template>

<script>
import questionCard from '../question/QuestionPersonCard.vue'
export default {
  components:{
    questionCard
  }
}
</script>

<style scoped>

</style>

