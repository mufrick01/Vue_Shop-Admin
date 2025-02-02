import { tesloApi } from '@/api/tesloApi';
import { Gender, type Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';
import type { User } from '@/modules/auth/interfaces';

export const getProductById = async (productId: string): Promise<Product> => {
  // TODO: pensar creacion de un nuevo producto
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      price: 0,
      description: '',
      slug: '',
      stock: 0,
      sizes: [],
      gender: '' as Gender,
      tags: [],
      images: [],
      user: {} as User,
    };
  }
  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);
    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.log(error);
    throw new Error('product id not found');
  }
};
