import { CertificateService } from '../services/certificate.service';
import { Certificate } from '../entities/certificate.entity';
export declare class CertificateController {
    private readonly certificateService;
    constructor(certificateService: CertificateService);
    findAll(): Promise<Certificate[]>;
    findOne(id: string): Promise<Certificate>;
    findByStudent(studentId: string): Promise<Certificate[]>;
    findByCourse(courseId: string): Promise<Certificate[]>;
    generate(studentId: string, courseId: string): Promise<Certificate>;
    verify(certificateNumber: string): Promise<Certificate>;
}
