<script setup lang="ts">
import {Post} from "~/types/Post";

const props = defineProps({
  post: Post
});

const currentMediaIndex = ref(0);
watch(() => props.post!, () => currentMediaIndex.value = 0);
</script>

<template>
  <div class="post-container flex">
    <div class="post-view relative w-1/2 aspect-square flex items-center">
      <PostViewContainer :medias="post!.medias" :current-media-index="currentMediaIndex" />
      <div class="absolute w-full *:w-7 *:cursor-pointer text-white font-bold flex justify-between p-2">
        <img :style="{visibility: currentMediaIndex > 0 ? 'visible' : 'hidden'}" alt="Icône media précédent" src="~/assets/img/arrow_icon.svg" @click="currentMediaIndex-1 >= 0 ? currentMediaIndex-- : null">
        <img :style="{visibility: currentMediaIndex < post!.medias.length-1 ? 'visible' : 'hidden'}" alt="Icône media suivant" src="~/assets/img/arrow_icon.svg" @click="currentMediaIndex+1 < post!.medias.length ? currentMediaIndex++ : null" class="rotate-180">
      </div>
    </div>
    <div class="post-details w-1/2 flex flex-col m-2 gap-4">
      <div class="flex flex-row items-center gap-2">
        <img class="w-12 rounded-full" alt="Photo de profil" :src="'/api/download/' + post!.picUrl">
        <div class="flex flex-col text-sm text-start">
          <div class="line-clamp-1" :title="post!.fullname + ' (@' + post!.username + ')'">{{ post!.fullname }} (@{{ post!.username }})</div>
          <div class="flex gap-1">
            <img class="w-4" alt="Icône location" src="~/assets/img/location_icon.svg">
            <span class="line-clamp-1" :title="post!.locationName">{{ post!.locationName }}</span>
          </div>
        </div>
      </div>
      <div class="text-start line-clamp-[7]" :title="post!.text">{{ post!.text }}</div>
      <div class="post-stats flex mt-auto justify-evenly">
        <div>
          <img alt="Icône like" title="Nombre de likes" src="~/assets/img/like_icon.svg">
          <span>{{ post!.likeCount }}</span>
        </div>
        <div>
          <img alt="Icône commentaire" title="Nombre de commentaires" src="~/assets/img/comment_icon.svg">
          <span>{{ post!.commentCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-container {
  max-width: 50rem;
  margin: auto;
  background-color: whitesmoke;
}

.post-stats > div {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.post-stats img {
  width: 1.5rem;
}
</style>