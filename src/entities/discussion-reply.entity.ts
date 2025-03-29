import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Discussion } from './discussion.entity';

@Entity('discussion_replies')
export class DiscussionReply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: string;

  @ManyToOne(() => Discussion)
  @JoinColumn({ name: 'discussionId' })
  discussion: Discussion;

  @Column()
  discussionId: string;

  @ManyToOne(() => DiscussionReply, { nullable: true })
  @JoinColumn({ name: 'parentReplyId' })
  parentReply: DiscussionReply;

  @Column({ nullable: true })
  parentReplyId: string;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @Column({ type: 'boolean', default: false })
  isInstructorResponse: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}