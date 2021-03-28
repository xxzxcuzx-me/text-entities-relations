<template>
    <div>
        Graph
    </div>
    <div>
        <GraphComponent/>        
    </div>
    <div>
        <FooterComponent/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GraphComponent from "@/components/GraphComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  name: "Graph",
  components: {
    GraphComponent,
    FooterComponent
  }
});
</script>
