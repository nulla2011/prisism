<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#F925A0',
      colorTextBase: 'rgb(85,73,89)'  // #615365 * 0.88
    },
  }" :autoInsertSpaceInButton='false'>
    <div id="main">
      <RouterView v-slot="{ Component, route }">
        <template v-if="Component">
          <button v-show="$route.name !== 'home'" class="back" @click="$router.back()"></button>
          <KeepAlive>
            <Suspense timeout="0">
              <template #default>
                <component :is="Component" :key="route.path"></component>
              </template>
              <template #fallback>
                <a-spin size="large"
                  class="fixed top-0 left-0 bottom-0 right-0 z-50 flex flex-col justify-center items-center bg-[#ffffff90]" />
              </template>
            </Suspense>
          </KeepAlive>
        </template>
      </RouterView>
    </div>
  </a-config-provider>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
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
    transform: var(--scale-effect);
  }
}
</style>