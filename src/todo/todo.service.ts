import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = await this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        image: createTodoDto.image,
      },
    });

    return { status: HttpStatus.CREATED, newTodo };
  }

  async findAll() {
    return await this.prismaService.todo.findMany();
  }

  async findOne(id: number) {
    const todo = await this.prismaService.todo.findUnique({
      where: { id },
    });
    if (!todo) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Мастер с id ${id} не найдена`,
      };
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const updateTodo = await this.prismaService.todo.update({
      where: { id },
      data: updateTodoDto,
    });

    return { status: HttpStatus.OK, updateTodoDto };
  }

  async remove(id: number) {
    const deleteTodo = await this.prismaService.todo.delete({
      where: { id },
    });
    return { status: HttpStatus.OK, deleteTodo };
  }
}
