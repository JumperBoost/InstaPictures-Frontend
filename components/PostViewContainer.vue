<script setup lang="ts">
import {Media} from "~/types/Media";

const props = defineProps({
  medias: Array as PropType<Array<Media>>,
  currentMediaIndex: Number
});
</script>

<template>
  <ul class="post-media">
    <li v-for="index in medias!.length" :key="index" :style="'transform: translateX(' + (index-currentMediaIndex!-1) * 100 + '%)'">
      <img alt="Media" v-if="medias![index-1].type == 'image'" :src="'/api/download/' + medias![index-1].url">
      <video :muted="props.currentMediaIndex != index-1" oncanplay="this.play()" loop v-if="medias![index-1].type == 'video'">
        <source :src="'/api/download/' + medias![index-1].url">
      </video>
    </li>
  </ul>
</template>

<style scoped>
.post-media {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #2A3335;
  align-items: center;
  overflow: hidden;
}

.post-media li {
  position: absolute;
  transition: all 0.25s ease-out;
}
</style>