import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  description: string;
}
