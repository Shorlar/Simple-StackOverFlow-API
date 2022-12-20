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

  @ManyToOne(() => Question, (question) => question.id, {
    eager: true,
  })
  question: Question;

  @Column()
  answerBody: string;

  @Column({ default: 0 })
  score: number;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;
}
