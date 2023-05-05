<template>
  <div class="header flex py-3">
    <el-button><span class="folder-button">打开目录</span></el-button>
  </div>
  <div class="main"></div>
</template>

<style lang="scss" scoped>
.folder-button {
  font-family: yuanti;
  font-size: 18px;
}

.main {
  overflow-y: auto;
}
</style>