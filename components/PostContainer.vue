<script setup lang="ts">
import {Post} from "~/types/Post";

const props = defineProps({
  post: Post
});

const currentMediaIndex = ref(0);
watch(() => props.post!, () => currentMediaIndex.value = 0);

const getInstagramUrl = () => "https://instagram.com/";
</script>

<template>
  <div class="post-container md:flex">
    <div class="post-view relative md:w-1/2 aspect-square flex items-center">
      <PostViewContainer :medias="post!.medias" :current-media-index="currentMediaIndex" />
      <img class="" :style="{visibility: currentMediaIndex > 0 ? 'visible' : 'hidden'}" alt="Icône media précédent" src="~/assets/img/arrow_icon.svg" @click="currentMediaIndex-1 >= 0 ? currentMediaIndex-- : null">
      <img class="rotate-180 right-0" :style="{visibility: currentMediaIndex < post!.medias.length-1 ? 'visible' : 'hidden'}" alt="Icône media suivant" src="~/assets/img/arrow_icon.svg" @click="currentMediaIndex+1 < post!.medias.length ? currentMediaIndex++ : null">
    </div>
    <div class="post-details md:w-1/2 max-md:h-80 flex flex-col">
      <div class="h-full flex flex-col px-2 pt-2 gap-4">
        <div class="flex flex-row items-center gap-2">
          <a :href="getInstagramUrl() + post!.username" target="_blank"><img class="post-pic loading w-12 h-12 rounded-full" alt="Photo de profil" :src="'/api/download/' + post!.picUrl" :key="post!.picUrl"></a>
          <div class="flex flex-col text-sm text-start flex-1">
            <div class="line-clamp-1" :title="'@' + post!.username"><a :href="getInstagramUrl() + post!.username" target="_blank">@{{ post!.username }}</a></div>
            <a :href="getInstagramUrl() + 'explore/locations/' + post!.locationId" target="_blank">
              <div class="flex gap-1">
                <img class="w-4" alt="Icône location" src="~/assets/img/location_icon.svg">
                <span class="line-clamp-1" :title="post!.locationName">{{ post!.locationName }}</span>
              </div>
            </a>
          </div>
        </div>
        <div class="text-start line-clamp-[7]" :title="post!.text">{{ post!.text }}</div>
        <div class="post-stats flex mt-auto justify-evenly">
          <a :href="getInstagramUrl() + 'p/' + post!.code + '/liked_by'" target="_blank">
            <div>
              <img alt="Icône like" title="Nombre de likes" src="~/assets/img/like_icon.svg">
              <span>{{ post!.likeCount }}</span>
            </div>
          </a>
          <a :href="getInstagramUrl() + 'p/' + post!.code" target="_blank">
            <div>
              <img alt="Icône commentaire" title="Nombre de commentaires" src="~/assets/img/comment_icon.svg">
              <span>{{ post!.commentCount }}</span>
            </div>
          </a>
        </div>
      </div>
      <span class="ml-auto mt-auto mr-2 italic" :title="new Date(post!.date * 1000).toLocaleString('fr')">Publié le {{ new Date(post!.date * 1000).toLocaleString('fr', {dateStyle: 'long'}) }}</span>
    </div>
  </div>
</template>

<style scoped>
.post-container {
  max-width: 50rem;
  margin: auto;
  background-color: whitesmoke;
}

.post-view img {
  position: absolute;
  width: 1.75rem;
  cursor: pointer;
  margin: 0 0.5rem;
  &>*:hover {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}

.post-pic {
  background-color: #2A3335;
  box-shadow: black 1px 1px 1px 1px;
}

.post-stats div {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.post-stats img {
  width: 1.5rem;
}
</style>