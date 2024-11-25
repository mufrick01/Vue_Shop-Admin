<template>

  <TopMenu />



  <RouterView />

  <!-- Footer -->
  <FooterMenu />
</template>

<script setup lang="ts">
import FooterMenu from '../components/FooterMenu.vue';
import TopMenu from '../components/TopMenu.vue';
</script>
