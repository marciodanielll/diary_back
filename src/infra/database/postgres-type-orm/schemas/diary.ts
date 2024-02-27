import {
  BaseEntity,
  Column,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user';

@Entity({ name: 'diaries' })
export class Diary extends BaseEntity {
  @Column({ type: 'uuid', primary: true, generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  iv: string;

  @Column({ type: 'text' })
  encryptedData: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.diaries)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
