import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto);
  }

  @Get('get-all')
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todoService.remove(+id);
  }
}
