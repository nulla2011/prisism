<template>
  <a-card>
    <section class="flex items-center">
      <div class="w-1/2">
        <a-switch id="loop" :checked="isLoop" @checked="$emit('update:loop', $event.target.value)" />
        <label class="label" for="loop">Loop</label>
      </div>
      <div class="w-1/2">
        <input id="color-picker" type="color" name="Background Color" value="bgColor"
          @input="$emit('update:color', $event.target!.value)" />
        <label class="label" for="color-picker">Background Color</label>
      </div>
    </section>
  </a-card>
</template>
<script setup lang="ts">
defineProps<{ isLoop: boolean, bgColor: string }>();
defineEmits<{ 'update:loop': [isLoop: boolean], 'update:color': [bgColor: string] }>();
</script>
<style scoped>
#color-picker {
  border-radius: 3px;
  appearance: auto;
  inline-size: 50px;
  block-size: 27px;
  background-color: buttonface;
  color: buttontext;
  border-width: 1px;
  border-style: solid;
  border-color: buttonborder;
  border-image: initial;
  padding: 1px 2px;
}
</style>