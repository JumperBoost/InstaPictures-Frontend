<script setup lang="ts">
import {City} from "~/types/City";

defineProps({
  city: City
});
</script>

<template>
  <div>{{ city!.name }}, {{ city!.postal_code }}, {{ city!.department }}, {{ city!.region }}, {{ city!.country }}</div>
</template>

<style scoped>
div {
  padding: 5px 0;
  cursor: pointer;
}
</style>