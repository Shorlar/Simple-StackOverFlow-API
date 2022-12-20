import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Question } from './questions.entity';
import { User } from './user.entity';

@Entity()
export class Votes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Question, (question) => question.id, {
    eager: true,
  })
  question: Question;

  @Column()
  voteType: string;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;
}
