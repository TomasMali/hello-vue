<template>
 
<h1>Header</h1>


</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>





<style>

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from{
opacity: 0;
transform: translateY(-30px);
}

.route-leave-to{
opacity: 0;
transform: translateY(30px);
}

.route-enter-active{
transition: all 0.3s ease-out;
}

.oute-leave-active{
transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from{
opacity: 1;
transform: translateY(0)
}
</style>
