<template>
  <a-button @click="handleClick">test</a-button>
</template>
<script setup lang="ts">
const handleClick = () => {
  window.api.test()
}
</script>