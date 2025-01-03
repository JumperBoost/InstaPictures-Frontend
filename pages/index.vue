<script setup lang="ts">
import {City} from "~/types/City";

const selected = ref<City>();
const selectedResult = ref<Boolean|null>();
const hasAcceptedCGU = ref<Boolean>();

const handleSelectedCity = (city?: City) => {
  selected.value = city;
  if(city === undefined)
    selectedResult.value = undefined;
};
const handleSelectedResult = (found: Boolean|null) => selectedResult.value = found;

onMounted(() => {
  if(localStorage.hasAcceptedCGU)
    hasAcceptedCGU.value = localStorage.hasAcceptedCGU == 'true';
  else hasAcceptedCGU.value = false;
});
watch(() => hasAcceptedCGU.value, () => localStorage.hasAcceptedCGU = Boolean(hasAcceptedCGU.value));
</script>

<template>
  <div class="box flex flex-col items-center gap-5 md:w-10/12 mx-auto p-5 text-center bg-white bg-opacity-60 rounded-xl">
    <div>
      <h1 class="text-3xl font-bold">Découvrez les paysages et activités de votre ville</h1>
      <h3 class="font-light">— En seulement quelques clics —</h3>
    </div>
    <SearchableCityMenu :selected="selected" @selected="handleSelectedCity" />
    <div v-if="selected" class="w-full">
      <div v-if="selectedResult === undefined" class="flex flex-col items-center">
        <img alt="Logo chargement" src="~/assets/img/loading.svg" class="h-10">
        <p>Les posts sont en cours de chargement, veuillez patienter un instant. Cela prend généralement moins d'une minute.</p>
      </div>
      <p v-if="selectedResult === false" class="text-red-500">Une erreur est survenue lors du chargement des posts.</p>
      <p v-if="selectedResult === null" class="text-red-500">Aucun post n'a été trouvé avec la ville sélectionnée.</p>
      <PostListContainer :selected="selected" @result="handleSelectedResult" />
    </div>
    <PopupMessageContainer v-if="hasAcceptedCGU == false">
      <img alt="Logo InstaPictures" src="~/assets/img/logo_icon.png" class="w-20" />
      <p class="font-bold">Bienvenue sur Insta'Pictures, le site web de l'évasion ✨</p>
      <div>
        <p>Naviguez à travers différentes photos & vidéos de votre ville, prises par les habitants et/ou touristes.</p>
        <p>Vous pouvez rechercher n'importe où à travers la France !</p>
      </div>
      <div>
        <p>Les médias étant basés sur des publications réelles <a href="https://www.instagram.com/" target="_blank" class="italic">Instagram</a>, en naviguant sur notre site, vous vous engagez à respecter les <a href="https://help.instagram.com/581066165581870/?locale=fr_FR&hl=fr-fr" target="_blank" class="font-bold">CGU</a> d'Instagram.</p>
        <p>Vous accepterez également d'utiliser à bon escient notre site internet, et de n'effectuer aucun acte nuisible.</p>
        <p>Toute violation de ces conditions d'utilisation est interdite, et peut faire l'objet de poursuites judiciaires.</p>
      </div>
      <div class="popup-buttons flex gap-5">
        <div class="bg-green-500" @click="hasAcceptedCGU = true">Accepter - Entrer</div>
        <div class="bg-red-500"><a href="about:blank">Refuser - Sortir</a></div>
      </div>
    </PopupMessageContainer>
  </div>
</template>

<style scoped>
.popup-msg {
  @media screen and (min-width: 385px) and (max-width: 530px) {
    img { width: 3rem }
    p { font-size: 1rem; line-height: 150% }
    .popup-buttons { font-size: 1rem }
  }

  @media screen and (max-width: 385px) {
    img { width: 2rem }
    p { font-size: 0.75rem; line-height: 150% }
    .popup-buttons { font-size: 0.75rem }
  }
}
</style>