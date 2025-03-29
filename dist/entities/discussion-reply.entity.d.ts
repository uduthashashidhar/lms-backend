import { User } from './user.entity';
import { Discussion } from './discussion.entity';
export declare class DiscussionReply {
    id: string;
    content: string;
    author: User;
    authorId: string;
    discussion: Discussion;
    discussionId: string;
    parentReply: DiscussionReply;
    parentReplyId: string;
    likeCount: number;
    isInstructorResponse: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
