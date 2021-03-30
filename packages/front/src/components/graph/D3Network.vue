<template>
  <div class="net">
    <SvgRenderer
      ref="svg"
      :nodes="nodes"
      :links="links"
      :selectedNodes="selectedNodes"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { GraphService } from "core";
import { Node } from "core";
import { Link } from "core";
import { Point } from "core";

import SvgRenderer from "./SvgRenderer.vue";
import { SvgRendererOptions } from "./SvgRendererOptions";

import {
  forceSimulation,
  forceX,
  forceY,
  forceManyBody,
  forceLink
} from "d3-force";

const d3 = { forceSimulation, forceX, forceY, forceManyBody, forceLink };

export default defineComponent({
  name: "D3Network",
  components: {
    SvgRenderer
  },
  props: {},
  data(): {
    options: SvgRendererOptions;
    nodes: Array<Node>;
    links: Array<Link>;
    selectedNodes: Array<Node>;
    force: number;
    mouseOffset: Point;
  } {
    return {
      nodes: [],
      links: [],
      selectedNodes: [],
      options: {
        svgSize: {
          width: 500,
          height: 500
        },
        fontSize: 10,
        nodeSize: 5
      },
      force: 500,
      mouseOffset: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {
    const graphService = GraphService.get();
    graphService.generateRandomNodes();
    graphService.generateLinks();
    this.nodes = graphService.nodes;
    this.links = graphService.links;
  },
  methods: {}
});
</script>
