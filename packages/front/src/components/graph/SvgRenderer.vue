<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    ref="svg"
    :width="options.svgSize.width"
    :height="options.svgSize.height"
    @mouseup="emit('dragEnd', [$event])"
  >
    <g class="links" id="l-links">
      <path
        class="link"
        v-for="link in links"
        :key="link.id"
        :d="linkPath(link)"
        :id="link.id"
        @click="emit('linkClick', [$event, link])"
        v-bind="linkAttrs(link)"
        :style="linkStyle(link)"
      ></path>
    </g>

    <g class="nodes" id="l-nodes">
      <template v-for="(node, key) in nodes" :key="key">
        <circle
          :r="getNodeSize(node)"
          @click="emit('nodeClick', [$event, node])"
          @mousedown.prevent="emit('dragStart', [$event, key])"
          :cx="node.position.x"
          :cy="node.position.y"
          :style="nodeStyle(node)"
          :title="node.name"
          :class="nodeClass(node)"
          v-bind="node.svgAttributes"
        ></circle>
      </template>
    </g>

    <g class="labels" id="node-labels">
      <text
        class="node-label"
        v-for="node in nodes"
        :key="node.id"
        :x="node.position.x + getNodeSize(node) / 2 + options.fontSize / 2"
        :y="node.position.y"
        :font-size="options.fontsize"
        :class="node.labelClass ? node.labelClass : ''"
        :stroke-width="options.fontsize / 8"
      >
        {{ node.name }}
      </text>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";

import { Node } from "core";
import { Link } from "core";

import { SvgRendererOptions } from "./SvgRendererOptions";

type emitedEvents = "dragEnd" | "linkClick" | "nodeClick" | "dragStart";

export default defineComponent({
  name: "SvgRenderer",
  emits: ["dragEnd", "linkClick", "nodeClick", "dragStart"],
  props: {
    nodes: {
      type: Array as PropType<Array<Node>>,
      required: true
    },
    links: {
      type: Array as PropType<Array<Link>>,
      required: true
    },
    selectedNodes: {
      type: Array as PropType<Array<Node>>,
      required: true
    },
    options: {
      type: Object as PropType<SvgRendererOptions>,
      required: true
    }
  },
  methods: {
    getNodeSize(node: Node): number {
      return node.size ?? this.options.nodeSize;
    },
    emit(eventName: emitedEvents, args: any[]) {
      this.$emit(eventName, args);
    },
    linkPath(link: Link) {
      const path = {
        M: [link.sourcePosition.x | 0, link.sourcePosition.y | 0],
        X: [link.targetPosition.x | 0, link.targetPosition.y | 0]
      };
      return `M ${path.M.join(" ")} L ${path.X.join(" ")}`;
    },
    nodeStyle(node: Node) {
      return node.color ? `fill: ${node.color}` : "";
    },
    linkStyle(link: Link) {
      return link.color ? { stroke: link.color } : { stroke: "red" };
    },
    nodeClass(node: Node) {
      const cssClass = node.cssClass ? [node.cssClass] : [];
      cssClass.push("node");
      if (this.selectedNodes.find(n => n.id === node.id)) {
        cssClass.push("selected");
      }
      return cssClass;
    },
    linkAttrs(link: Link) {
      return { ...link.svgAttributes, "stroke-width": link.linkPower };
    }
  }
});
</script>
