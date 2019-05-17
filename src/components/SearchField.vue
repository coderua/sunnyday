<template>
    <form @submit.prevent="searchByCity" class="search-field-form">
      <input
        v-model="query"
        name="search"
        type="search"
        class="search-field-form__input"
        placeholder="Enter location"
        autofocus
      />
      <button class="search-field-form__search-by-city-button">Search</button>
      <button class="search-field-form__search-by-location-button" type="button" @click="searchByLocation" title="Current location">&#11216;</button>
    </form>
</template>

<script>
/**
 * Search City field
 *
 * Custom tag `<search-field />`
 *
 * @vuedoc
 * @emits searchByCity
 * @emits searchByLocation
 * @exports views/SearchCityField
 */
export default {
  name: 'SearchField',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    searchByCity() {
      const query = this.query.trim();

      if (query.length === 0) {
        // Empty query: nothing to search
        return;
      }

      this.$emit('searchByCity', { q: this.query.trim() });
    },
    searchByLocation() {
      this.$emit('searchByLocation');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/css/media-query-mixin.scss";

  .search-field-form {
    input, button {
      font-size: 1em;
      margin-right: 6px;
    }

    .search-field-form__search-by-location-button {
      font-size: 0.83em;
    }
  }
  .search-field-form__input {
    width: 60%;
  }

</style>
