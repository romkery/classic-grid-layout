<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Увеличить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
