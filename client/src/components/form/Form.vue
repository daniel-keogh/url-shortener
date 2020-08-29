<template>
  <form @submit.prevent="onSubmit" @keyup.enter="onSubmit">
    <input-box
      autofocus
      v-model="longUrl"
      placeholder="Enter a URL..."
      :isValid="isValidUrl || longUrl.length === 0"
    />

    <input-box
      autofocus
      optional
      isValid
      v-model="slug"
      placeholder="Enter a slug..."
    />

    <b-button
      expanded
      class="submit-btn"
      type="is-primary"
      size="is-medium"
      @click="onSubmit"
      >Submit</b-button
    >
  </form>
</template>

<script>
import InputBox from "./InputBox";

export default {
  name: "AppForm",

  components: {
    InputBox
  },

  computed: {
    isValidUrl() {
      try {
        new URL(this.longUrl.trim());
      } catch (_) {
        return false;
      }

      return true;
    }
  },

  data() {
    return {
      longUrl: "",
      slug: ""
    };
  },

  methods: {
    onSubmit() {
      if (this.isValidUrl) {
        this.$emit("url-submit", this.longUrl.trim(), this.slug.trim());
      } else {
        this.$buefy.toast.open({
          duration: 2000,
          message: "Please enter a valid URL",
          type: "is-danger",
          position: "is-bottom"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  padding: 0 3rem;

  & > *:first-child {
    padding-bottom: 1rem;
  }

  @media (max-width: 1100px) {
    padding: 0 1rem;
  }
}

.submit-btn {
  margin-top: 1.25rem;
}
</style>
