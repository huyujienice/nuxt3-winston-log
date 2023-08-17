<template>
  <div>Nuxt module playground!</div>
</template>

<script setup>
console.log(`app.vue setup`);
console.log(new Date().getTime());
console.error(`error happen ${new Date().getTime()}`);
</script>
