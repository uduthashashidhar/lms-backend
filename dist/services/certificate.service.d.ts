import { Repository } from 'typeorm';
import { Certificate } from '../entities/certificate.entity';
import { Progress } from '../entities/progress.entity';
export declare class CertificateService {
    private certificateRepository;
    private progressRepository;
    constructor(certificateRepository: Repository<Certificate>, progressRepository: Repository<Progress>);
    findAll(): Promise<Certificate[]>;
    findOne(id: string): Promise<Certificate>;
    findByStudent(studentId: string): Promise<Certificate[]>;
    findByCourse(courseId: string): Promise<Certificate[]>;
    create(studentId: string, courseId: string): Promise<Certificate>;
    verify(certificateNumber: string): Promise<Certificate>;
    private generateCertificateNumber;
    private calculateCompletionTime;
    private generateAchievements;
}
