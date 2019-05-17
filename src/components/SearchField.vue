<template>
    <form @submit.prevent="searchByCity" class="search-field-form">
      <input
        v-model="query"
        name="search"
        type="search"
        class="search-field-form__input"
        placeholder="Enter location"
      />
      <button>Search</button>
      <button type="button" @click="searchByLocation">Current location</button>
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

<style scoped>

</style>
