import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from '../task.model';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false }) 
  userId: number;
}
