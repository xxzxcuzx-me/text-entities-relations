<template>
  <div id="footer">
      <p>
        <span>
        © Made with love and paszyn
        </span>
      </p>
  </div>
</template>

<style>
  #footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:40px; 
   background: LightGrey;
  }

  #footer p {
    margin-left: 5px;
    font-size: 15px;
    text-align: left;
    color: black;
  }
 </style>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import { NerInterfaceService } from "core";
export default defineComponent({
  name: "Footer",
  props: {
    
  },
  
});
</script>