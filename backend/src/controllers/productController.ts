import { Request, Response, NextFunction } from 'express';
import status, { BAD_REQUEST } from 'http-status';
import { HttpError, NotFoundError, ParameterError } from '../errors';
import {
  GetAllProductsResponse,
  ProductResponse,
  NewProductRequest,
} from '../interfaces/product';
import * as productService from '../services/productService';

export async function addNewProduct(
  req: Request<unknown, unknown, NewProductRequest, unknown>,
  res: Response<ProductResponse>,
  next: NextFunction
): Promise<void> {
  const product = req.body;

  try {
    const result = await productService.addNewProduct(product);
    res.send(result);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}

export async function getProductById(
  req: Request<unknown, unknown, unknown, { productId: string }>,
  res: Response<ProductResponse>,
  next: NextFunction
): Promise<void> {
  const productId = Number(req.query.productId);

  try {
    const data = await productService.getProductById(productId);
    res.send(data);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}

export async function getAllProducts(
  req: Request,
  res: Response<GetAllProductsResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productService.getAllProducts();
    res.send(data);
  } catch (error) {
    next(new HttpError(status.INTERNAL_SERVER_ERROR));
  }
}

export async function deleteProductById(
  req: Request<{ productId: string }, unknown, unknown, unknown>,
  res: Response<void>,
  next: NextFunction
): Promise<void> {
  const productId = Number(req.params.productId);

  try {
    const data = await productService.deleteProductById(productId);
    res.send(data);
  } catch (error) {
    if (error instanceof ParameterError) {
      next(new HttpError(status.BAD_REQUEST, error.message));
    } else if (error instanceof NotFoundError) {
      next(new HttpError(status.NOT_FOUND));
    } else {
      next(new HttpError(status.INTERNAL_SERVER_ERROR));
    }
  }
}
