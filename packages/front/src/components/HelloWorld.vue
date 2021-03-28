<template>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import { NerInterfaceService } from "core";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup() {
    const nerInterface = new NerInterfaceService();
    const onProgressUnsub = nerInterface.onProgress.sub((progress: number) => {
      console.log(progress);
    });

    onUnmounted(() => {
      onProgressUnsub();
    });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
