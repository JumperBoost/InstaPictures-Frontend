<script setup lang="ts">

</script>

<template>
  <header class="fixed h-20 w-full bg-white border-b-black border-b-2">
    <nav class="h-full">
      <ul class="flex h-full items-center [&>li:has(a):hover]:animate-pulse [&>li:has(a):hover]:text-red-500">
        <li><img class="w-80 ml-2" src="~/assets/img/logo_full.png" alt="Logo Insta'Pictures"/></li>
        <li class="separator mx-3"></li>
        <li><a href="https://google.fr/">Rechercher</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
  </main>
  <footer class="h-10 w-full bg-white">

  </footer>
</template>