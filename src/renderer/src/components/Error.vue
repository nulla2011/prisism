<template>
  <div class="mask flex justify-center items-center">
    <div class="dialogue flex flex-col">
      <h1>错误</h1>
      <div class="main text-center mt-7 flex-1">
        <p class="err-occur">发生错误。</p>
        <p class="err-content px-4 mt-2">
          <slot></slot>
        </p>
      </div>
      <div class="pt-4 pb-8 flex justify-evenly">
        <button @click="$router.go(0)">重试</button>
        <button @click="back">返回</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useError from '@renderer/store/useError';
import { useRouter } from 'vue-router'
const store = useError();
const router = useRouter();
const back = () => {
  router.back();
  store.$reset();
}
</script>
<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2010;
}

.dialogue {
  height: 400px;
  width: 522px;
  background-image: url('@renderer/assets/image/popup_dialogue.png');
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  z-index: 2011;
  font-family: yuanti;
  animation: 0.1s ease 0s pop;

  @keyframes pop {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  h1 {
    font-family: yuanti;
    font-size: 28px;
    color: var(--el-text-color-primary);
    padding-block: 15px;
    padding-left: 58px;
  }

  .main {
    font-family: yuanti;
    color: var(--text-color);
  }

  .err-occur {
    font-size: 22px;
  }

  .err-content {
    font-size: 18px;
    white-space: pre-line;
  }

  button {
    $border: 2.5px;
    width: 148px;
    height: 70px;
    background-image: url('@renderer/assets/image/button.png');
    font-family: yuanti;
    text-align: center;
    color: white;
    font-size: 25px;
    text-shadow: #d62078 $border 0 0, #d62078 0 $border 0, #d62078 0 - $border 0 0, #d62078 0 0 - $border 0;

    &:active {
      transform: var(--scale-effect);
    }
  }
}
</style>