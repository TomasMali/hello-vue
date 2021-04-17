

<template>
  <div>
    <h1>PUBBLIC</h1>

    <p>
      A Grid Layout must have a parent element with the
      <em>display</em> property set to <em>grid</em> or <em>inline-grid</em>.
    </p>

    <p>
      Direct child element(s) of the grid container automatically becomes grid
      items.
    </p>

    <div class="grid-container">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
    </div>

    <button @click="apriM" class="w3-button w3-red">Red</button>

    <div v-if="apri" class="w3-container w3-center w3-animate-top">
      <h1>Animation is Fun!</h1>
      <p>The w3-animate-top class slides in an element from the top.</p>
    </div>





  </div>
</template>


<script>
export default {
  data() {
    return {
      apri: false,
    };
  },
  methods: {
    apriM(){
      this.apri = !this.apri 
    }
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196f3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>