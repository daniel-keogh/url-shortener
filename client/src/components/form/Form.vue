<template>
  <form @submit.prevent="onSubmit">
    <input-box
      autofocus
      v-model="longUrl"
      placeholder="Enter a URL..."
      :isValid="isValid || longUrl.length === 0"
    />

    <b-button
      expanded
      class="submit-btn"
      type="is-primary"
      size="is-medium"
      @click="onSubmit"
    >
      Submit
    </b-button>
  </form>
</template>

<script>
import InputBox from './InputBox';

export default {
  name: 'AppForm',

  components: {
    InputBox,
  },

  computed: {
    isValid() {
      try {
        new URL(this.longUrl.trim());
      } catch (_) {
        return false;
      }

      return true;
    },
  },

  data() {
    return {
      longUrl: '',
    };
  },

  methods: {
    onSubmit() {
      if (this.isValid) {
        this.$emit('url-submit', this.longUrl.trim());
      } else {
        this.$buefy.toast.open({
          duration: 2000,
          message: 'Please enter a valid URL',
          type: 'is-danger',
          position: 'is-bottom',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  padding: 0 3rem;

  @media (max-width: 1100px) {
    padding: 0 1rem;
  }
}

.submit-btn {
  margin-top: 1.25rem;
}
</style>
