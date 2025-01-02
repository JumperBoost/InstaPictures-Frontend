<script setup lang="ts">
import MediaContainer from "~/components/MediaContainer.vue";
import {Media} from "~/types/Media";

defineProps({
  media: Media,
});

const emits = defineEmits<{
  pclose : any
}>();
</script>

<template>
  <AbstractPopupContainer>
    <div class="popup-media">
      <MediaContainer :media="media" />
      <div class="absolute -bottom-6 text-white cursor-pointer" @click="emits('pclose')">[X] Fermer</div>
    </div>
  </AbstractPopupContainer>
</template>

<style scoped>
.popup-media {
  position: relative;
  max-width: 80vw;
}

.popup-media > * {
  max-height: 80vh;
}
</style>