import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    console.log('ProductView setup');

    return {
      // properties

      // getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      // actions
    };
  },
});
