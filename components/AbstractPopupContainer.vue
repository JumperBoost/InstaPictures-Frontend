<template>
  <div class="popup">
    <slot />
  </div>
</template>

<style>
.popup {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.popup-buttons > * {
  padding: 0.25rem 0.5rem;
  border: 1px solid black;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}
</style>