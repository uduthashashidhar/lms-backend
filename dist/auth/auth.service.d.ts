import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateUser(token: string): Promise<any>;
    generateToken(user: any): Promise<string>;
}
