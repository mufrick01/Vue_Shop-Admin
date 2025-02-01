<template>
  <div>
    <input :type="type" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')" @blur="$emit('blur')"
      :class="['form-control', { 'border-red-500': error }]" />
    <span class="text-red-500 capitalize" v-if="error">{{ error }}</span>
    <span class="text-red-500 capitalize opacity-0" v-else>_</span>
  </div>
</template>
<script lang="ts" setup>

export interface CustomInputProps {
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number';
}
defineEmits(['update:modelValue', 'blur'])
withDefaults(defineProps<CustomInputProps>(), {
  type: 'text',
})

</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
