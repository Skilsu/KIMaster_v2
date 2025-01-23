<template>
  <div class="base-card">
    <header v-if="$slots.header">
      <slot name="header"> </slot>
    </header>
    <slot></slot>
  </div>
</template>

<script>
/**
 * Used to group several Elements together into one basic Unit
 * @module BaseCard
 */
export default {
  mounted() {
    console.log(this.$slots.header);
  },
};
</script>

<style scoped>
header {
  justify-content: space-between;
  align-items: center;
}
div {
  margin: 1.5rem auto !important;
  max-width: 50rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  
}

.base-card {
  background-color: #ffffff; /* Hintergrundfarbe auf Weiß gesetzt */
}

.dark-mode .base-card {
  background-color: #333333;
  color: #ffffff;
}

@media (max-width: 1100px) and (max-height: 1400px)  {
  .base-card {
    width: 100%;
    background: #ff8d5b; 
    animation: mymove 5s infinite;
    font-family: 'Honk', sans-serif;
    font-size: 25px;
    }
    @keyframes mymove {
  20% {background-color: #98ca60;}
}
.dark-mode .base-card {
  background-color: #333333!important;
  color: #ffffff;
}
 }
</style>
