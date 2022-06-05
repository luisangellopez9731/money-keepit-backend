import { Category, CategoryRepository } from "./Category.entity";
import { CreateDto, UpdateDto } from "./dtos";
import { createSchema, updateSchema } from "./joi.schema";
import { AutoRestCrudTenant } from "core/auto-rest-crud/AutoRestCrudTenant";

export class CategoryController extends AutoRestCrudTenant<
  Category,
  CreateDto,
  UpdateDto
> {
  constructor() {
    super("/categories", CategoryRepository, {
      validations: { post: createSchema, update: updateSchema },
    });
  }
}
