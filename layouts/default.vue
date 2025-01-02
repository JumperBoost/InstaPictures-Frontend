<script setup lang="ts">

</script>

<template>
  <header class="z-40 fixed h-20 w-full bg-white border-b-black border-b-2">
    <nav class="h-full mr-3">
      <ul class="flex h-full items-center [&>li:has(a):hover]:animate-pulse [&>li:has(a):hover]:text-red-500">
        <li>
          <picture>
            <source srcset="~/assets/img/logo_icon.png" media="(max-width: 480px)" width="56">
            <source srcset="~/assets/img/logo_full.png" media="(min-width: 480px)" width="320">
            <img src="" class="ml-2" alt="Logo Insta'Pictures">
          </picture>
        </li>
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