import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const CreateUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id;
  product = CleanProductBeforeInsert(product);

  if (productId && productId !== '') {
    return await UpdateProduct(productId, product);
  }
  return await CreateProduct(product);
};

const CleanProductBeforeInsert = (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ?? '';
      }
      return image;
    }) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};

const UpdateProduct = async (productId: string, product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, product);
    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error updating product');
  }
};

const CreateProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.post<Product>(`/products`, product);
    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
};
