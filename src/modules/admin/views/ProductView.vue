<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Producto: <small class="text-blue-500">{{ title }}</small></h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-1">
        <label for="title" class="form-label">Título</label>
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
      </div>

      <div class="mb-1">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-1">
        <label for="description" class="form-label">Descripción</label>
        <CustomTextArea v-model="description" v-bind="descriptionAttrs" :error="errors.description" />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-1 flex-1">
          <label for="price" class="form-label ">Precio</label>
          <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price" type="number" />

        </div>

        <div class="mb-1 flex-1">
          <label for="stock" class="form-label">Inventario</label>
          <CustomInput v-model.number="stock" v-bind="stockAttrs" :error="errors.stock" type="number" />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Tallas</label>
        <div class="flex">
          <button v-for="(size) in allSizes" :key="size" @click="toggleSize(size)" type="button" :class="['size-btn',
            {
              'bg-blue-600 text-blue-50': hasSize(size),
              'bg-blue-100': !hasSize(size),
            }
          ]">{{
            size
          }}</button>
        </div>

      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div class="flex-shrink-0" v-for="image in images" :key="image.value">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px]" />
        </div>
        <div class="flex-shrink-0" v-for="(imageFile, index) in ImageFiles" :key="`${imageFile.name}-${index}`">
          <img :src="temporalImageUrl(imageFile)" :alt="title" class="w-[250px] h-[250px]" />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>
        <input multiple type="file" id="image" class="form-control" accept="image/*" @change="onFileChanged" />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select class="form-control" v-model="gender" v-bind="genderAttrs">
          <option value="">Seleccione</option>
          <option value="kid">Niño</option>
          <option value="unisex">Unisex</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
        </select>
        <span class="text-red-500 capitalize" v-if="errors.gender">{{ errors.gender }}</span>
        <span class="text-red-500 capitalize" v-else>{{ errors.gender }}</span>

      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button type="submit" :class="['text-white font-bold py-2 px-4 rounded transition-all',
          {
            'disabled:bg-blue-200 disabled: opacity-80': !meta.valid || isPending,
            'bg-blue-500 hover:bg-blue-700': meta.valid
          }]" :disabled="!meta.valid || isPending">
          Guardar
        </button>
      </div>
    </div>
  </form>

  <!-- vee-validate -->
  <div class="grid grid-cols-2 mt-2">
    <pre class="bg-blue-200 p-2">
      {{ JSON.stringify(values, null, 1) }}
    </pre>
    <pre class="bg-red-200 p-2">
      {{ JSON.stringify(errors, null, 1) }}
    </pre>
  </div>



</template>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-1;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}

.size-btn {
  @apply p-2 flex-1 rounded w-14 mr-2 transition-all;
}
</style>


<script src="./ProductView.ts" lang="ts"></script>
