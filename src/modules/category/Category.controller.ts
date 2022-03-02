import { getConnection } from "typeorm";
import { AutoCrud } from "core/auto-rest-crud";
import { Category, CategoryRepository } from "./Category.entity";

export class CategoryController extends AutoCrud<Category, any, any> {
  constructor() {
    super("/categories", CategoryRepository(getConnection()));
  }
}
