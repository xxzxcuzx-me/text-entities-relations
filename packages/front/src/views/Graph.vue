<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-main><d3-network /></el-main>
      <el-aside width="400px">Aside</el-aside>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import D3Network from "@/components/graph/D3Network.vue";

export default defineComponent({
  name: "Graph",
  components: {
    D3Network
  }
});
</script>
