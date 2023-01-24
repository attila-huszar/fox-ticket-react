import axios, { AxiosError } from 'axios';
import { ProductRequest, ProductResponse } from '../interfaces/product';

export async function fetchProducts() {
  const response = await axios.get('/api/products');
  return response.data.allProducts;
}

export async function fetchAddNewProduct(productData: ProductRequest): Promise<ProductResponse> {
  try {
    const response = await axios.post('/api/admin/products', {
      name: productData.name,
      price: productData.price,
      duration: productData.duration,
      description: productData.description,
      type: productData.type,
    });
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw error
  }
}
