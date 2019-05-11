<template>
    <form @submit.prevent="search">
      <input
        v-model="query"
        name="search"
        type="search"
      />
    </form>
</template>

<script>
/**
 * Search City field
 *
 * Custom tag `<search-city-field />`
 *
 * @vuedoc
 * @exports views/SearchCityField
 */
export default {
  name: 'SearchCityField',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    search() {
      this.$emit('newSearch', { query: this.query.trim() });
    },
  },
};
</script>

<style scoped>

</style>
