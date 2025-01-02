<script setup lang="ts">
import {Media} from "~/types/Media";

const imageElement = ref<HTMLImageElement>();
const videoElement = ref<HTMLVideoElement>();

function unMountMedia() {
  // Suppression du src pour annuler la requête si besoin
  if(imageElement.value)
    imageElement.value.src = '';
  if(videoElement.value)
    videoElement.value.src = '';
}

defineProps({
  media: Media,
  videoMuteCondition: Boolean
});

const emits = defineEmits<{
  loaded: any
}>();

onBeforeUnmount(() => unMountMedia());
</script>

<template>
  <img alt="Media" v-if="media!.type == 'image'" :src="'/api/download/' + media!.url" ref="imageElement" @load="emits('loaded')">
  <video :muted="videoMuteCondition" oncanplay="this.play()" loop v-if="media!.type == 'video'" ref="videoElement" @load="emits('loaded')">
    <source :src="'/api/download/' + media!.url">
  </video>
</template>