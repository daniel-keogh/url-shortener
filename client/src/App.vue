<template>
  <div id="app">
    <main>
      <app-card />
    </main>
  </div>
</template>

<script>
import AppCard from './components/Card';

export default {
  name: 'App',
  components: {
    AppCard,
  },
};
</script>

<style lang="scss">
#app {
  background-color: #fafafa;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100vh;

  @media (max-width: 900px) {
    background-color: white;
    display: block;
  }
}

main {
  flex: 1;
  max-width: 80rem;
}

::selection {
  color: white;
  background-color: #7957d5;
}
</style>
