<template>
  <video muted autoplay loop id="background-clip" class="loading">
    <source src="~/assets/video/background_clip.mp4" type="video/mp4">
  </video>
  <header class="z-40 fixed h-20 w-full bg-white border-b-black border-b-2">
    <nav class="h-full">
      <ul class="h-full flex justify-center items-center [&>li:has(a):hover]:animate-pulse">
        <li>
          <a href="/">
            <picture>
              <source srcset="~/assets/img/logo_icon.png" media="(max-width: 480px)" width="56">
              <source srcset="~/assets/img/logo_full.png" media="(min-width: 480px)" width="320">
              <img src="" alt="Logo Insta'Pictures">
            </picture>
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
    <div class="absolute bottom-1 right-0 text-white italic text-xs opacity-30">
      <a href="https://www.pexels.com/@richard-ellis-2346652/" target="_blank">Vidéo réalisée par Richard Ellis</a>
    </div>
  </main>
  <footer class="h-10 w-full bg-white border-t-black border-t-2 flex items-center justify-center font-semibold">
    <a href="https://github.com/JumperBoost" target="_blank">Créé avec ❤️ par Milwenn Franceus–Cointrel</a>
  </footer>
</template>