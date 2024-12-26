import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    // const {} = await tesloApi.get(`/products?page=${page}&limit=${limit}`);
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
