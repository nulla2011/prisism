<template>
  <div id="main">
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <button v-show="$route.name !== 'home'" class="back" @click="$router.back()"></button>
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" :key="route.path"></component>
          </template>
          <template #fallback>
            <div v-loading.fullscreen="true" element-loading-background="rgba(122, 122, 122, 0.8)" class="w-full h-full">
            </div>
          </template>
        </Suspense>
      </template>
    </RouterView>
    <Error v-if="store.error" @retry="$router.go(0)">{{ store.error }}</Error>
  </div>
</template>
<script setup lang="ts">
import Error from '@renderer/components/Error.vue';
import useError from '@renderer/store/useError';
const store = useError();
window.api.axiosError((event, errorText) => {
  store.error = errorText;
})
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