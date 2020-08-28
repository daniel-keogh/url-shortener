<template>
  <div class="app-card">
    <div class="app-card__content">
      <div class="app-card__content--left">
        <h1 class="app-card__heading subtitle has-text-centered is-3">
          URL Shortener
        </h1>

        <app-form @url-submit="handleSubmit" />

        <div class="link-container">
          <a
            href="https://github.com/daniel-keogh/url-shortener"
            target="_blank"
          >
            <b-icon icon="github" size="is-medium" />
          </a>
        </div>
      </div>

      <div class="app-card__content--right">
        <recents-list :items="recent" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import AppForm from "./form/Form";
import RecentsList from "./recent/RecentsList";

export default {
  name: "AppCard",

  components: {
    AppForm,
    RecentsList
  },

  data() {
    return {
      recent: []
    };
  },

  mounted() {
    if (localStorage.recent) {
      this.recent = JSON.parse(localStorage.recent) ?? [];
    }

    const slugs = this.recent.map(e => e.slug);

    slugs.forEach(slug => {
      axios.get(`/${slug}?no_redirect=true`).catch(err => {
        if (err.response?.status === 404) {
          this.recent = this.recent.filter(e => e.slug === slug);
        }
      });
    });
  },

  watch: {
    recent(data) {
      localStorage.recent = JSON.stringify(data);
    }
  },

  methods: {
    handleSubmit(longUrl) {
      const index = this.recent.findIndex(e => e.longUrl === longUrl);

      if (index === -1) {
        axios
          .post(`/api/urls`, {
            longUrl
          })
          .then(res => {
            this.recent.push(res.data.url);
            this.recent.sort((a, b) => {
              if (a.isoTimestamp > b.isoTimestamp) {
                return -1;
              }
              if (a.isoTimestamp < b.isoTimestamp) {
                return 1;
              }
              return 0;
            });
          })
          .catch(e => {
            if (e.response) {
              this.showToast(e.response.data.message);
            } else {
              this.showToast(e.message);
            }
          });
      } else {
        this.showToast("You already submitted that URL!");
      }
    },

    showToast(message) {
      this.$buefy.toast.open({
        duration: 2000,
        message,
        position: "is-bottom",
        type: "is-danger"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-card {
  padding: 2rem 0;
  margin: 0 1rem;

  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 12px 18px 2px rgba(34, 0, 51, 0.04),
    0 6px 22px 4px rgba(7, 48, 114, 0.12),
    0 6px 12px -4px rgba(14, 13, 26, 0.12);

  &__heading {
    position: absolute;
    top: 0;
  }

  &__content {
    display: flex;
    position: relative;
    height: 33rem;

    &--left {
      flex: 1;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .link-container {
        position: absolute;
        bottom: 0;
      }
    }

    &--right {
      flex: 1.5;
      border-left: 0.1rem solid lightgray;
    }
  }

  @media (max-width: 900px) {
    box-shadow: none;

    &__heading {
      position: relative;
      padding-top: 3rem;
      padding-bottom: 5rem;
    }

    &__content {
      height: auto;
      flex-direction: column;

      &--left .link-container {
        margin-bottom: -5rem;
      }

      &--right {
        border-left: none;
        margin-top: 3rem;
      }
    }
  }
}
</style>
