import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Answer } from './answer.entity';
import { User } from './user.entity';
import { Votes } from './votes.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @Column()
  userDisplayName: string;

  @Column()
  questionBody: string;

  @Column({ default: true })
  subscribeAnswer: boolean;

  @Column({ default: 0 })
  score: number;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;

  @OneToMany(() => Answer, (answer) => answer.question, { eager: true })
  answer: Answer;

  @OneToMany(() => Votes, (votes) => votes.question)
  vote: Votes;
}
