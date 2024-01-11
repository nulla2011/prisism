<template>
  <section
    class="w-full min-h-[584px] mt-4 bg-white border border-solid border-slate-400 rounded flex place-content-center place-items-center">
    <a-image v-if="ext === 'png' || ext === 'jpg'" :src="useGetUrlHash(dir, name, ext)" />
    <pre v-else-if="ext === 'json'"></pre>
    <audio v-else-if="ext === 'm4a'" controls :src="`http://localhost:${PORT}/assets/${path}`"></audio>
  </section>
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { extname, dirname, basename } from 'path-browserify';
const props = defineProps<{ path: string }>();
const PORT = import.meta.env.RENDERER_VITE_PORT;
const ext = extname(props.path).slice(1);
const dir = dirname(props.path) + '/';
const name = basename(props.path, '.' + ext);
</script>