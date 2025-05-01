import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CategoriesService } from '../categories/categories.service';
import { ProductDto } from './dto/product-dto';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private categoryService: CategoriesService
    ) { }

    getProductsById(id: string) {
        return this.productModel.findById(id).populate('category');
    }

    async getProductsByCategory(idCategory: string) {
        return this.productModel.find({ category: new Types.ObjectId(idCategory) }).populate('category')
    }

    getProductsByName(name: string) {
        return this.productModel.findOne({ name }).populate('category')
    }

    async createProduct(product: ProductDto) {
        const category = await this.categoryService.getCategoryByName(product.category.name);

        if (!category) {
            throw new NotFoundException('Categoria no encontrada');
        }

        const productModel = new this.productModel({
            ...product,
            category: category._id
        });
        return productModel.save()
    }

}
