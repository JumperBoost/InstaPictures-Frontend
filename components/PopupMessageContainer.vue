<script setup lang="ts">
defineProps({
  title: String
});
</script>

<template>
  <AbstractPopupContainer>
    <div class="popup-msg">
      <h2 v-if="title">{{ title }}</h2>
      <div class="h-full flex flex-col gap-3 justify-center items-center text-lg">
        <slot />
      </div>
    </div>
  </AbstractPopupContainer>
</template>

<style scoped>
.popup-msg {
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 75%;
  padding: 0.75rem;
  background-color: whitesmoke;
  opacity: 0.75;
}

.popup-msg > h2 {
  font-weight: 700;
  font-size: 2.5rem;
}
</style>