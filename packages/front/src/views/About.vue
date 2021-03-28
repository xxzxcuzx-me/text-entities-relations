<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <FooterComponent/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  name: "About",
  components: {
    FooterComponent
  }
});
</script>

