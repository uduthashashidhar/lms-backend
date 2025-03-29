import { DiscussionService } from '../services/discussion.service';
import { Discussion } from '../entities/discussion.entity';
import { DiscussionReply } from '../entities/discussion-reply.entity';
export declare class DiscussionController {
    private readonly discussionService;
    constructor(discussionService: DiscussionService);
    findAll(): Promise<Discussion[]>;
    findOne(id: string): Promise<Discussion>;
    create(createDiscussionDto: Partial<Discussion>): Promise<Discussion>;
    update(id: string, updateDiscussionDto: Partial<Discussion>): Promise<Discussion>;
    remove(id: string): Promise<{
        id: string;
    }>;
    findByCourse(courseId: string): Promise<Discussion[]>;
    addReply(discussionId: string, replyDto: Partial<DiscussionReply>): Promise<Discussion>;
    removeReply(replyId: string): Promise<{
        id: string;
    }>;
    getReplies(discussionId: string): Promise<DiscussionReply[]>;
}
