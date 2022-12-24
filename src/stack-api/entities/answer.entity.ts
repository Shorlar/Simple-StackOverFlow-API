import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Question } from './questions.entity';
import { User } from './user.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userDisplayName: string;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @Column()
  answerBody: string;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;
}
