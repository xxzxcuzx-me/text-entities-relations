<template>
Graph Component
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import { NerInterfaceService } from "core";
export default defineComponent({
  name: "GraphComponent",
  props: {
    nodes: Array
  },
  
});
</script>