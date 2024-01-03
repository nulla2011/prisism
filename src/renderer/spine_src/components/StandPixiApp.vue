<template>
  <div class="flex">
    <div id="canvas" class="overflow-hidden" style="height: 720px; width: 750px"></div>
    <div class="control flex-1 max-h-[720px] p-1 overflow-y-scroll">
      <a-card v-for="anmType in Object.keys(animation)" :title="anmType" size="small" class="w-full">
        <a-radio-group v-model:value="animation[anmType]" :name="anmType">
          <a-radio v-for="name in animationList[anmType]" :value="name">{{ name }}</a-radio>
        </a-radio-group>
      </a-card>
      <Options v-model:isLoop="isLoop" v-model:bgColor="bgColor" />
    </div>
  </div>
</template>
<script setup lang="ts">
import 'pixi-spine'
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';
import { ref, onMounted, watch, reactive } from 'vue';
import Options from './Options.vue';
import useCategorizeAnimation from '../composables/useCategorizeAnimation';
const props = defineProps<{ type: string, id: string }>();
const app = new PIXI.Application<HTMLCanvasElement>({ height: 720, width: 750 });
onMounted(() => document.querySelector('#canvas')!.appendChild(app.view));

const animation = reactive({
  main: 'blank',
  face: 'blank',
  status: 'blank',
  eye: 'blank',
  lip: 'blank'
});
const isLoop = ref(false);
const bgColor = ref('#7f7f7f');
watch([animation, isLoop], ([newAnm, newIsLoop]) => {
  chara.state.setAnimation(1, newAnm.main, newIsLoop);
  chara.state.setAnimation(2, newAnm.face, newIsLoop);
  chara.state.setAnimation(3, newAnm.status, newIsLoop);
  chara.state.setAnimation(4, newAnm.eye, newIsLoop);
  chara.state.setAnimation(5, newAnm.lip, newIsLoop);
});
watch(bgColor, (newValue) => {
  app.renderer.background.color = parseInt(newValue.replace('#', ''), 16);
})
const URL = `http://localhost:${import.meta.env.RENDERER_VITE_PORT}/assets/spine/idols/${props.type}/${props.id}/data.json`;
const asset = await PIXI.Assets.load(URL);
const animationList = useCategorizeAnimation(asset.spineData.animations.map((item: any) => item.name));
const chara = new Spine(asset.spineData);
try {
  chara.skeleton.setSkinByName('reverse');
} catch (e) {
  chara.skeleton.setSkinByName('default');
}
chara.x = app.screen.width / 2;
chara.y = app.screen.height / 1.8;
chara.scale.set((app.screen.height / asset.spineData.height) * 0.9);
app.stage.addChild(chara);
app.renderer.background.color = parseInt(bgColor.value.replace('#', ''), 16);
</script>
<style lang="scss" scoped>
.control {
  &::-webkit-scrollbar {
    width: 3px
  }

  &::-webkit-scrollbar-thumb {
    background: #999
  }
}
</style>