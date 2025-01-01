<script setup lang="ts">
import {Post} from "~/types/Post";
import {City} from "~/types/City";
import {$fetch} from "ofetch";
import {Media} from "~/types/Media";

const props = defineProps({
  selected: City
});

const emits = defineEmits<{
  result: [found: Boolean]
}>();

const topPosts = ref<Post[]>([]);
const latestPosts = ref<Post[]>([]);

const showLatestPosts = ref(false);
const posts = computed(() => {
  if(showLatestPosts.value)
    return topPosts.value.concat(latestPosts.value);
  return topPosts.value;
});
const currentPostIndex = ref(0);

onMounted(() => {
  if(props.selected)
    search(props.selected);
  else return; // TODO: Définir un message d'erreur
});

onUnmounted(() => {

})

const shuffleArray = (array: any[]) => { // Modification directe du tableau (sans copie)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Choisir un indice aléatoire
    [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments
  }
};

const shufflePosts = () => {
  shuffleArray(topPosts.value);
  shuffleArray(latestPosts.value);
};

function addPostInArray(postsRef: Ref<Post[]>, postArray: any, locArray: any, locId: string) {
  let medias: Media[] = [];
  for(const mediaI in postArray['medias']) {
    const media = postArray['medias'][mediaI];
    medias.push(new Media(media['type'], media['url']));
  }
  postsRef.value.push(new Post(postArray['code'], postArray['text'], locId, locArray['location_name'], postArray['username'], postArray['fullname'],
      postArray['pic'], postArray['likeCount'], postArray['commentCount'], medias));
}

function search(city: City) {
  $fetch('/api/search/city/' + city.name + ' ' + city.country).then(res => {
    topPosts.value = [];
    latestPosts.value = [];
    res = JSON.parse(res);
    for(const locId in res) {
      const loc = res[locId];
      for(const postI in loc['topPosts'])
        addPostInArray(topPosts, loc['topPosts'][postI], loc, locId);
      for(const postI in loc['latestPosts'])
        addPostInArray(latestPosts, loc['latestPosts'][postI], loc, locId);
    }
    shufflePosts();
    emits('result', true);
  }).catch(err => {
    console.log(err);
    emits('result', false);
  });
}
</script>

<template>
  <div v-if="posts.length > 0">
    <PostContainer :post="posts[currentPostIndex]" />
    <div class="w-full *:w-7 *:cursor-pointer text-white font-bold flex justify-center p-2 gap-4">
      <img v-if="currentPostIndex > 0" alt="Icône media précédent" title="Post précédent" src="~/assets/img/arrow_icon.svg" @click="currentPostIndex-1 >= 0 ? currentPostIndex-- : null">
      <img v-if="currentPostIndex < posts.length-1" alt="Icône media suivant" title="Post suivant" src="~/assets/img/arrow_icon.svg" @click="currentPostIndex+1 < posts.length ? currentPostIndex++ : null" class="rotate-180">
    </div>
  </div>
</template>

<style scoped>

</style>