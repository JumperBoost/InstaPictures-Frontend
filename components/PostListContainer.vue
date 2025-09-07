<script setup lang="ts">
import {Post} from "~/types/Post";
import {City} from "~/types/City";
import {$fetch} from "ofetch";
import {Media} from "~/types/Media";

const props = defineProps({
  selected: City,
  hasAcceptedSensibleContent: Boolean
});

const emits = defineEmits<{
  result: [Boolean|null],
  'accepted-sensible-content': [Boolean]
}>();

const posts = ref<Post[]>([]);

const showPosts = ref(props.hasAcceptedSensibleContent);
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
  shuffleArray(posts.value);
};

function addPostInArray(postsRef: Ref<Post[]>, postArray: any, locArray: any, locId: string) {
  let medias: Media[] = [];
  for(const mediaI in postArray['medias']) {
    const media = postArray['medias'][mediaI];
    medias.push(new Media(media['type'], media['url']));
  }
  postsRef.value.push(new Post(postArray['code'], postArray['text'], postArray['date'], locId, locArray['location_name'], postArray['username'],
      postArray['pic'], postArray['likeCount'], postArray['commentCount'], medias));
}

function search(city: City) {
  $fetch('/api/search/city/' + city.name + ' ' + city.country).then(res => {
    posts.value = [];
    res = JSON.parse(res);
    for(const locId in res) {
      const loc = res[locId];
      for(const postI in loc['posts'])
        addPostInArray(posts, loc['posts'][postI], loc, locId);
    }
    shufflePosts();
    // Afficher le popup de contenus sensibles s'il a jamais été affiché et qu'il y a des posts
    if(showPosts.value === false && posts.value.length > 0)
      showPopup.value = true;

    if(posts.value.length == 0)
      emits('result', null);
    else emits('result', true);
  }).catch(err => {
    console.log(err);
    emits('result', false);
  });
}

function afficherPosts() {
  showPopup.value = false;
  showPosts.value = true;
  emits('accepted-sensible-content', true);
}
</script>

<template>
  <div v-if="posts.length > 0 && showPosts">
    <PostContainer :post="posts[currentPostIndex]" class="box" />
    <div class="w-full *:w-7 *:cursor-pointer text-white font-bold flex justify-center p-2 gap-4 [&>*:hover]:animate-pulse">
      <img v-if="currentPostIndex > 1" alt="Icône premier post" title="Premier post" src="~/assets/img/double_arrow_icon.svg" @click="currentPostIndex = 0">
      <img v-if="currentPostIndex > 0" alt="Icône post précédent" title="Post précédent" src="~/assets/img/arrow_icon.svg" @click="currentPostIndex--">
      <img v-if="currentPostIndex < posts.length-1" alt="Icône post suivant" title="Post suivant" src="~/assets/img/arrow_icon.svg" @click="currentPostIndex++" class="rotate-180">
      <img v-if="currentPostIndex == posts.length-1 && !showPosts" alt="Icône post suivant avec attention" title="Post suivant (Avec attention)" src="~/assets/img/arrow_icon.svg" @click="showPopup = true" class="rotate-180 bg-red-500 rounded-full">
      <img v-if="currentPostIndex < posts.length-2" alt="Icône dernier post" title="Dernier post" src="~/assets/img/double_arrow_icon.svg" @click="currentPostIndex = posts.length-1" class="rotate-180">
    </div>
  </div>
  <PopupMessageContainer v-if="!showPosts && showPopup" title="⚠️ Contenus sensibles">
    <p><i>Instagram</i>, comme tout réseau social, contient des utilisateurs indésirables, pouvant publier du contenu heurtant la sensibilité d'autrui.</p>
    <p>Dépendant entièrement de la plateforme <i>Instagram</i>, <u>nous ne tenons pas responsable du contenu de ces posts</u>.</p>
    <br>
    <p class="font-bold">Acceptez-vous de continuer ?</p>
    <div class="popup-buttons flex gap-5">
      <div class="bg-green-500" @click="afficherPosts">Accepter</div>
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