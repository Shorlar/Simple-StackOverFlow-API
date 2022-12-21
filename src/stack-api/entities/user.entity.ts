import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Answer } from './answer.entity';
import { Question } from './questions.entity';
import { Votes } from './votes.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ length: 256, nullable: true })
  aboutMe: string;

  @OneToMany(() => Question, (question) => question.user)
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.user)
  answer: Answer;

  @OneToMany(() => Votes, (votes) => votes.user)
  vote: Votes;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;
}
