import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DiarySchema } from './diary.schema';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'users' })
export class UserSchema extends BaseEntity {
  @Column({ type: 'uuid', primary: true, generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'is_activated', default: true })
  isActivated: boolean;

  @OneToMany(() => DiarySchema, (diary) => diary.user, {
    cascade: ['insert', 'recover', 'update'],
  })
  diaries: DiarySchema[];
}
