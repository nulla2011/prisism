<template>
  <section
    class="w-full min-h-[584px] mt-4 bg-white border border-solid border-slate-400 rounded flex place-content-center place-items-center">
    <a-image v-if="ext === 'png' || ext === 'jpg'" :src="useGetUrlHash(dir, name, ext, hash)" />
    <pre v-else-if="ext === 'json' || ext === 'atlas'" class="break-words whitespace-pre-wrap">{{ textContent }}</pre>
    <audio v-else-if="ext === 'm4a'" controls :src="src"></audio>
    <video v-else-if="ext === 'mp4'" controls class="max-w-full">
      <source :src="useGetUrlHash(dir, name, ext, hash)" type="video/mp4" />
    </video>
  </section>
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import useQueryHash from '@renderer/composables/useQueryHash';
import { extname, dirname, basename } from 'path-browserify';

const props = defineProps<{ path: string }>();
const ext = extname(props.path).slice(1);
const dir = dirname(props.path) + '/';
const name = basename(props.path, '.' + ext);
const hash = await useQueryHash(dir, name);
const src = `http://localhost:${import.meta.env.RENDERER_VITE_PORT}/assets/${props.path}${hash ? `?hash=${hash}` : ''}`;
let textContent: string;
if (ext === 'json' || ext === 'atlas') {
  textContent = await fetch(src).then((res) => res.text());
}
</script>