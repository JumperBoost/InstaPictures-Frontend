<script setup lang="ts">
import {Post} from "~/types/Post";
import {City} from "~/types/City";
import {$fetch} from "ofetch";
import {Media} from "~/types/Media";

const props = defineProps({
  selected: City
});

const emits = defineEmits<{
  result: [Boolean|null]
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

const showPopup = ref(false);

onMounted(() => search(props.selected!));

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
  postsRef.value.push(new Post(postArray['code'], postArray['text'], postArray['date'], locId, locArray['location_name'], postArray['username'], postArray['fullname'],
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
    // Afficher le popup de contenus sensibles si il y a pas de top posts mais qu'il y a des posts récents
    if(topPosts.value.length == 0 && latestPosts.value.length > 0)
      showPopup.value = true;

    if(topPosts.value.length == 0 && latestPosts.value.length == 0)
      emits('result', null);
    else emits('result', true);
  }).catch(err => {
    console.log(err);
    emits('result', false);
  });
}

function afficherPostsRecents() {
  showPopup.value = false;
  showLatestPosts.value = true;
  if(posts.value.length - 1 > currentPostIndex.value)
    currentPostIndex.value++;
}

function estUnPostSensible(index: number) {
  return latestPosts.value.includes(posts.value[index]);
}
</script>

<template>
  <div v-if="posts.length > 0">
    <PostContainer :post="posts[currentPostIndex]" class="box" />
    <div class="w-full *:w-7 *:cursor-pointer text-white font-bold flex justify-center p-2 gap-4 [&>*:hover]:animate-pulse">
      <img v-if="currentPostIndex > 1" alt="Icône premier post" title="Premier post" src="~/assets/img/double_arrow_icon.svg" @click="currentPostIndex = 0" :class="{'bg-red-500 rounded-full': estUnPostSensible(0)}">
      <img v-if="currentPostIndex > 0" alt="Icône post précédent" title="Post précédent" src="~/assets/img/arrow_icon.svg" @click="currentPostIndex--" :class="{'bg-red-500 rounded-full': estUnPostSensible(currentPostIndex-1)}">
      <img v-if="currentPostIndex < posts.length-1" alt="Icône post suivant" title="Post suivant" src="~/assets/img/arrow_icon.svg" @click="currentPostIndex++" class="rotate-180" :class="{'bg-red-500 rounded-full': estUnPostSensible(currentPostIndex+1)}">
      <img v-if="currentPostIndex == posts.length-1 && !showLatestPosts" alt="Icône post suivant avec attention" title="Post suivant (Avec attention)" src="~/assets/img/arrow_icon.svg" @click="showPopup = true" class="rotate-180 bg-red-500 rounded-full">
      <img v-if="currentPostIndex < posts.length-2" alt="Icône dernier post" title="Dernier post" src="~/assets/img/double_arrow_icon.svg" @click="currentPostIndex = posts.length-1" class="rotate-180" :class="{'bg-red-500 rounded-full': estUnPostSensible(posts.length-1)}">
    </div>
  </div>
  <PopupMessageContainer v-if="showPopup" title="⚠️ Contenus sensibles">
    <p><i>Instagram</i>, comme tout réseau social, contient des utilisateurs indésirables, pouvant publier du contenu heurtant la sensibilité d'autrui.</p>
    <p>Dépendant entièrement de la plateforme <i>Instagram</i>, <u>nous ne tenons pas responsable du contenu de ces posts</u>.</p>
    <br>
    <p class="font-bold">Acceptez-vous de continuer et d'afficher les posts récents ?</p>
    <div class="popup-buttons flex gap-5">
      <div class="bg-green-500" @click="afficherPostsRecents">Accepter</div>
      <div class="bg-red-500" @click="showPopup = false">Refuser</div>
    </div>
  </PopupMessageContainer>
</template>

<style scoped>
.popup-msg {
  @media screen and (min-width: 385px) and (max-width: 530px) {
    p { font-size: 1rem; line-height: 150% }
    .popup-buttons { font-size: 1rem }
  }

  @media screen and (max-width: 385px) {
    p { font-size: 0.75rem; line-height: 150% }
    .popup-buttons { font-size: 0.75rem }
  }
}
</style>