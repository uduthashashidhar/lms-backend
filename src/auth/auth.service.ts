import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return {
        userId: payload.sub,
        email: payload.email,
        roles: payload.roles,
      };
    } catch {
      return null;
    }
  }

  async generateToken(user: any): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    return this.jwtService.sign(payload);
  }
}