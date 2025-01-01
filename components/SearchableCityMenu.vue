<template>
  <div class="w-full">
    <SearchBar v-model="input" @input="autocomplete" />
    <div class="searchable_suggests">
      <div v-for="city in propals" v-if="!selected" class="[&>*:hover]:animate-pulse [&>*:hover]:text-red-500" @click="select(city)">
        <SearchableCitySuggest :city="city" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchableCitySuggest from "~/components/SearchableCitySuggest.vue";
import {City} from "~/types/City";
import {$fetch} from "ofetch";

const emits = defineEmits<{
  selected: [city: City|undefined]
}>();

defineProps({
  selected: City
});

const input = ref("");
const propals = ref<City[]>([]);

let abortController: AbortController|undefined;

function select(city: City) {
  emits('selected', city)
  input.value = city.get_str;
}

function autocomplete() {
  emits('selected', undefined);
  if(abortController)
    abortController.abort();

  if(input.value.length < 3) {
    propals.value = [];
    return;
  }

  abortController = new AbortController();
  $fetch('/api/autocomplete/city/' + input.value, { signal: abortController.signal }).then(res => {
    propals.value = [];
    abortController = undefined;
    res = JSON.parse(res);
    for(const i in res) {
      const data = res[i];
      propals.value.push(new City(data['country'], data['name'], data['postal_code'], data['department'], data['region']));
    }
  }).catch(err => {
    if(err.cause.name != 'AbortError')
      console.log(err);
  });
}
</script>

<style scoped>
.searchable_suggests {
  background-color: whitesmoke;
  border-radius: 12px;
  margin-top: 5px;
}
</style>