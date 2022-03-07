import { getConnection } from "typeorm";
import { AutoCrud } from "core/auto-rest-crud";
import { Category, CategoryRepository } from "./Category.entity";
import { CreateDto, UpdateDto } from "./dtos";
import { createSchema, updateSchema } from "./joi.schema";

export class CategoryController extends AutoCrud<
  Category,
  CreateDto,
  UpdateDto
> {
  constructor() {
    super("/categories", CategoryRepository(getConnection()), {
      validations: { post: createSchema, update: updateSchema },
    });
  }
}
