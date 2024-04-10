import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8) // Por exemplo, mínimo de 8 caracteres para a senha
  passwordHash: string;
}
