import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  private async sendEmail(subject: string, message: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'mahmudovasim799@gmail.com',
      subject: subject,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async create(createTodoDto: CreateTodoDto) {
    try {
      const newTodo = await this.prismaService.todo.create({
        data: {
          title: createTodoDto.title,
          description: createTodoDto.description,
          image: createTodoDto.image,
        },
      });

      // Отправка email с данными задачи
      const subject = `Новая задача: ${createTodoDto.title}`;
      const message = `Задача: ${createTodoDto.title}\nОписание: ${createTodoDto.description}\nИзображение: ${createTodoDto.image || 'Нет изображения'}`;
      await this.sendEmail(subject, message);

      return { status: HttpStatus.CREATED, newTodo };
    } catch (error) {
      console.error('Error in creating Todo:', error);
      throw new Error('Failed to create Todo or send email');
    }
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
        message: `Задача с id ${id} не найдена`,
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
