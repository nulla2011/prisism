<template>
  <main>
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <button v-show="$route.name !== 'home'" class="back" @click="$router.back()"></button>
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" :key="route.path"></component>
          </template>
          <template #fallback>
            <div v-loading.fullscreen.lock="true" element-loading-background="rgba(122, 122, 122, 0.8)"></div>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </main>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
main {
  // min-width: 1280px;
  min-height: 720px;
  background-image: url('@renderer/assets/image/background.jpg');
  background-size: cover;
  scrollbar-gutter: stable;
}

.back {
  background-image: url('@renderer/assets/image/back_button.png');
  height: 70px;
  width: 70px;
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 5;

  &:active {
    transform: scale(1.1);
  }
}
</style>