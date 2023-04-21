<template>
  <el-row justify="space-evenly" class="top-36 h-20 mx-24">
    <el-col :span="6">
      <router-link to="/all-idol">
        <button class="menu-button">
          <span data-text="偶像">偶像</span>
          <el-dropdown class="icon justify-self-end" size="large">
            <down theme="outline" size="42" fill="#514a80" />
            <template #dropdown>
              <el-dropdown-menu>
                <a class="w-52 h-full" v-for="(value, name) in groups" @click="toGroup(name)">
                  <el-dropdown-item> {{ value }} </el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </button></router-link>
    </el-col>
    <el-col :span="6"><button class="menu-button">
        <span data-text="音乐">音乐</span>
      </button></el-col>
    <el-col :span="6"><button class="menu-button">
        <span data-text="背景">背景</span>
      </button></el-col>
  </el-row>
  <el-row justify="space-evenly" class="top-56 h-20 mx-24">
    <el-col :span="6"><button class="menu-button">
        <span data-text="衣装">衣装</span>
      </button></el-col>
    <el-col :span="6">
      <router-link to="/commu"><button class="menu-button">
          <span data-text="剧情">剧情</span>
        </button>
      </router-link></el-col>
    <el-col :span="6"><button class="menu-button">
        <span data-text="四格漫画">四格漫画</span>
      </button></el-col>
  </el-row>
  <el-row justify="space-evenly" class="top-80 h-20 mx-24">
    <el-col :span="6"><button class="menu-button">
        <span data-text="资源预览">资源预览</span>
      </button></el-col>
    <el-col :span="6"><button class="menu-button">
        <span data-text="设置">设置</span>
      </button></el-col>
  </el-row>
</template>
<script setup lang="ts">
import { Down } from '@icon-park/vue-next';
import { useRouter } from 'vue-router'
import groups from '@renderer/shared/constants/group'
const router = useRouter()
const toGroup = (group: string) => {
  router.push({
    name: 'GROUP',
    params: {
      groupName: group
    }
  })
}
</script>
<style lang="scss" scoped>
.menu-button {
  $height: 92px;
  $width: 261px;
  $font-size: 32px;
  background: url('@renderer/assets/image/menu_costume_button.png');
  background-size: cover;
  height: $height;
  width: $width;
  text-align: center;
  font-size: $font-size;

  &:active {
    // height: @height * 1.08;
    // width: @width * 1.08;
    // translate: @width * -0.04 @height * -0.04;
    // font-size: @font* 1.08;
    transform: var(--scale-effect);
  }

  .icon {
    position: absolute;
    // left: $width / 2;
    // top: $height / 2;
    transform: translate(40px, 0);
  }

  // span {
  //   position: relative;
  //   font-family: yuanti;
  //   font-size: 32px;
  //   font-weight: 900;
  //   letter-spacing: 15px;
  //   margin-right: -15px;
  //   background: linear-gradient(to top, #6e85bf 25%, #514a80 80%);
  //   background-clip: text;
  //   -webkit-background-clip: text;
  //   color: transparent;
  //   -webkit-text-stroke-width: 0.8px;
  //   -webkit-text-stroke-color: white;
  //   // z-index: 10;
  // }

  // span::after {
  //   @shadowWidth: 2px;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   content: attr(data-text);
  //   color: transparent;
  //   text-shadow: white 0 @shadowWidth, white @shadowWidth 0, white 0 calc(0px - @shadowWidth), white calc(0px - @shadowWidth) 0;
  // }
  span {
    $shadowWidth: 2.5px;
    $letterSpace: 12px;
    position: relative;
    font-family: yuanti;
    font-weight: 900;
    user-select: none;
    letter-spacing: $letterSpace;
    margin-right: 0px - $letterSpace;
    color: #6e85bf;
    text-shadow: white 0 $shadowWidth, white $shadowWidth 0, white 0 0px - $shadowWidth, white 0px - $shadowWidth 0;
    // -webkit-text-stroke-width: 0.8px;
    // -webkit-text-stroke-color: white;

    &::before {
      position: absolute;
      content: attr(data-text);
      z-index: 10;
      color: #514a80;
      -webkit-mask-image: linear-gradient(to top, transparent 25%, #FFF 80%);
    }
  }
}
</style>