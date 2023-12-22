<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#F925A0',
      colorTextBase: 'rgb(85,73,89)'  // #615365 * 0.88
    },
  }">
    <div id="main">
      <div>{{ `${type} ${id}` }}</div>
    </div>
  </a-config-provider>
</template>
<script setup lang="ts">
const s = new URLSearchParams(window.location.search);
const type = s.get('type');
const id = s.get('id');
</script>
<style lang="scss">
#main {
  // min-width: 1280px;
  min-height: 720px;
  background-color: transparent;

  &::before {
    position: fixed;
    content: '';
    width: 100%;
    height: 100%;
    z-index: -100;
    background-image: url('@renderer/assets/image/background.jpg');
    background-size: cover;
    scrollbar-gutter: stable;
  }
}
</style>