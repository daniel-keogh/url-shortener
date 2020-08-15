<template>
  <div class="recent-item">
    <div>
      <a class="recent-item__title" :href="item.shortUrl" target="_blank">
        {{ item.shortUrl | hideHttp }}
      </a>
      <p class="recent-item__subtitle">
        {{ item.longUrl | limit("65") }}
      </p>
    </div>

    <b-button
      rounded
      :type="!isCopied ? 'is-primary' : 'is-success'"
      :outlined="!isCopied"
      @click="handleCopy"
    >
      {{ isCopied ? "Copied!" : "Copy" }}
    </b-button>
  </div>
</template>

<script>
export default {
  name: "RecentItem",

  props: {
    item: Object
  },

  data: () => {
    return {
      isCopied: false
    };
  },

  filters: {
    limit: (value, length) => {
      const str = value.substring(0, length);
      return value.length > length ? `${str}...` : str;
    },

    hideHttp: value => {
      // Hide http(s) from URL
      return value.replace(/^https?:\/\//, "");
    }
  },

  methods: {
    async handleCopy() {
      await this.$copyText(this.item.shortUrl);

      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-size: 1.2rem;
  }

  &__subtitle {
    font-style: italic;
    font-size: 0.9rem;
    color: gray;
  }
}
</style>
