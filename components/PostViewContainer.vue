<script setup lang="ts">
import {Media} from "~/types/Media";
import MediaContainer from "~/components/MediaContainer.vue";
import PopupMediaContainer from "~/components/PopupMediaContainer.vue";

const props = defineProps({
  medias: Array<Media>,
  currentMediaIndex: Number
});

const showFullscreenMedia = ref(false);

const mediasInLoading = ref<Media[]>([]);
const resetLoadingMedias = () => {
  mediasInLoading.value = [];
  mediasInLoading.value.push(...props.medias!);
};

watch(() => props.medias!, () => resetLoadingMedias());
onMounted(() => resetLoadingMedias());
</script>

<template>
  <ul class="post-media cursor-pointer" :class="{'loading': mediasInLoading.includes(medias![currentMediaIndex!])}" @click="showFullscreenMedia = true">
    <li v-for="index in medias!.length" :key="index" :style="'transform: translateX(' + (index-currentMediaIndex!-1) * 100 + '%)'">
      <MediaContainer :media="medias![index-1]" :videoMuteCondition="currentMediaIndex != index-1 || showFullscreenMedia" @loaded="mediasInLoading.splice(mediasInLoading.indexOf(medias![index-1]), 1)" />
    </li>
  </ul>
  <PopupMediaContainer v-if="showFullscreenMedia" :media="medias![currentMediaIndex!]" @pclose="showFullscreenMedia = false" />
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