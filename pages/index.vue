<script setup lang="ts">
import {City} from "~/types/City";

const selected = ref<City>();
const selectedResult = ref<Boolean|undefined>(undefined);

const handleSelectedCity = (city?: City) => selected.value = city;
const handleSelectedResult = (found?: Boolean) => {
  selectedResult.value = found;
  if(found === undefined)
    selectedResult.value = undefined;
};
</script>

<template>
  <div class="flex flex-col items-center gap-5 w-10/12 mx-auto p-5 text-center bg-white bg-opacity-60">
    <h1>Découvrez les photos Instagram de votre ville</h1>
    <SearchableCityMenu :selected="selected" @selected="handleSelectedCity" />
    <div v-if="selected" class="w-full">
      <div v-if="selectedResult === undefined" class="flex flex-col items-center">
        <img alt="Logo chargement" src="~/assets/img/loading.svg" class="h-10">
        <p>Les posts sont en cours de chargement, veuillez patientez un instant. Cela prend généralement moins d'une minute.</p>
      </div>
      <p v-if="selectedResult === false" class="text-red-500">Une erreur est survenue lors du chargement des posts.</p>
      <PostListContainer :selected="selected" @result="handleSelectedResult" />
    </div>
  </div>
</template>

<style scoped>

</style>