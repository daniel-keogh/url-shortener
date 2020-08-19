<template>
  <div class="recent-list">
    <recent-item :item="item" v-for="item in items" :key="item.slug" />
  </div>
</template>

<script>
import RecentItem from "./RecentItem";

export default {
  name: "RecentsList",

  components: {
    RecentItem
  },

  props: {
    items: Array
  }
};
</script>

<style lang="scss" scoped>
.recent-list {
  padding: 0 3rem;

  height: 100%;

  overflow-x: hidden;
  overflow-y: auto;

  & > div {
    padding: 1rem 0;

    &:not(:last-child) {
      border-bottom: 1px solid lightgrey;
    }
  }

  @media (max-width: 1100px) {
    padding: 0 1rem;
  }
}
</style>
