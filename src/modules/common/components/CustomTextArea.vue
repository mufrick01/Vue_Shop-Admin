<template>
  <div>
    <textarea :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')" @blur="$emit('blur')"
      :class="['text-area', { 'border-red-500': error }]"></textarea>
    <span class="text-red-500 capitalize" v-if="error">{{ error }}</span>
    <span class="text-red-500 capitalize opacity-0" v-else>_</span>
  </div>
</template>

<script lang="ts" setup>
export interface CustomTextAreaProps {
  modelValue?: string | number;
  error?: string;
}
defineEmits(['update:modelValue', 'blur'])
defineProps<CustomTextAreaProps>()

</script>

<style scoped>
.text-area {
  @apply shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
