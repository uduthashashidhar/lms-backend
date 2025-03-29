import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Quiz } from './quiz.entity';

@Entity('quiz_submissions')
export class QuizSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column()
  quizId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'studentId' })
  student: User;

  @Column()
  studentId: string;

  @Column({ type: 'json' })
  answers: {
    questionId: string;
    answer: string | string[];
    isCorrect: boolean;
    points: number;
  }[];

  @Column({ type: 'float' })
  score: number;

  @Column({ type: 'float' })
  percentageScore: number;

  @Column({ type: 'boolean' })
  passed: boolean;

  @Column({ type: 'int' })
  attemptNumber: number;

  @Column({ type: 'timestamp' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'int' })
  timeSpentSeconds: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}