<template>
  <div id="canvas" class="overflow-hidden" style="height: 720px; width: 750px"></div>
</template>
<script setup lang="ts">
import 'pixi-spine'
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';
import { ref, onMounted, watch } from 'vue';
const props = defineProps<{ type: string, id: string }>();
const app = new PIXI.Application<HTMLCanvasElement>({ height: 720, width: 750 });
onMounted(() => document.querySelector('#canvas')!.appendChild(app.view));

const animationMain = ref('');
const animationFace = ref('');
const animationYN = ref('');
const animationEye = ref('');
const animationLip = ref('');
watch(animationMain, (val) => {
  chara.state.setAnimation(1, val, false);
});
const URL = `http://localhost:${import.meta.env.RENDERER_VITE_PORT}/assets/spine/idols/${props.type}/${props.id}/data.json`;
const asset = await PIXI.Assets.load(URL);
const options = asset.spineData.animations.map((item: any) => item.name);
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
app.renderer.background.color = 0x7f7f7f;
</script>