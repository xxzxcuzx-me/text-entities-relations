<template>
    Import
    <div>
    <ImportStep1Component />
    </div>
    <div>
    <ImportStep2Component />
    </div>
    <div>
    <ImportStep3Component />
    </div>
    <FooterComponent/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImportStep1Component from "@/components/ImportStep1Component.vue";
import ImportStep2Component from "@/components/ImportStep2Component.vue";
import ImportStep3Component from "@/components/ImportStep3Component.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  name: "Graph",
  components: {
    ImportStep1Component,
    ImportStep2Component,
    ImportStep3Component,
    FooterComponent
  }
});
</script>

