<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <div>
         <router-link to="/Import">
            <el-button id="button">
              Importuj plik tekstowy
            </el-button>
         </router-link>
        <router-link to="/Import">
            <el-button id="button">
              Importuj z pliku *.ter
            </el-button>
         </router-link>
      </div>
        <router-link to="/Graph">
            <el-button id="button">
              Przywróć poprzednią wersję
            </el-button>
        </router-link>
    </div>
  </div>
  <FooterComponent/>
</template>

<style>
  #button{
    margin: 5px 5px 5px 5px;
  }

</style>

<script lang="ts">
import { defineComponent } from "vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  name: "Home",
  components: {
      FooterComponent
  }
});
</script>
