import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/category-dto';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

    getCategories() {
        return this.categoryModel.find();
    }

    getCategoryByName(name: string){
        return this.categoryModel.findOne({ name });
    }

    getCategoryById(id: string){
        return this.categoryModel.findById(id);
    }

    createCategory(category: CategoryDto){
        const categoyModel = new this.categoryModel(category);
        return categoyModel.save()
    }


}
