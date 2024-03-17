import {
  BaseEntity,
  Column,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Relation,
} from 'typeorm';

import { UserSchema } from './user.schema';

@Entity({ name: 'diaries' })
export class DiarySchema extends BaseEntity {
  @Column({ type: 'uuid', primary: true, generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  iv: string;

  @Column({ type: 'text' })
  encryptedData: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => UserSchema, (user) => user.diaries)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserSchema>;
}
