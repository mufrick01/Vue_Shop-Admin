import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useFieldArray, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { CreateUpdateProductAction } from '@/modules/products/actions';
import { useToast } from 'vue-toastification';

const validationSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().min(0),
  stock: yup.number().required().min(0),
  gender: yup.string().required().oneOf(['men', 'women', 'kid', 'unisex']),
});

export default defineComponent({
  components: { CustomInput, CustomTextArea },
  props: {
    productId: { type: String, required: true },
  },
  setup(props) {
    const router = useRouter();
    const toast = useToast();

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: CreateUpdateProductAction,
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
    });
    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');
    gender.value = '';

    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    const ImageFiles = ref<File[]>([]);

    const onSubmit = handleSubmit((values) => {
      const formValues = {
        ...values,
        images: [...values.images, ...ImageFiles.value],
      };
      mutate(formValues);
    });

    const hasSize = (size: string) => {
      return sizes.value.map((s) => s.value).includes(size);
    };

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const existSize = currentSizes.includes(size);
      if (existSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const onFileChanged = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      const fileList = fileInput.files;
      if (!fileList) return;
      if (fileList.length === 0) return;

      for (const imageFile of fileList) {
        ImageFiles.value.push(imageFile);
      }
    };

    const temporalImageUrl = (imageFile: File) => {
      return URL.createObjectURL(imageFile);
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin-products' });
      }
    });

    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value,
        });
      },
      { deep: true, immediate: true },
    );

    watch(isUpdateSuccess, (value) => {
      if (!value) return;
      toast.success('Producto guardado correctamente');
      router.replace({
        name: 'admin-product',
        params: { productId: `${updatedProduct.value?.id}` },
      });

      resetForm({
        values: updatedProduct.value,
      });

      ImageFiles.value = [];
      console.log(ImageFiles.value);
    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
    );

    return {
      // properties
      values,
      errors,
      product,
      handleSubmit,
      meta,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      isPending,

      images,
      sizes,
      ImageFiles,
      // getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      // actions
      onSubmit,
      toggleSize,
      hasSize,
      onFileChanged,
      temporalImageUrl,
    };
  },
});
