import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() regDto: RegisterDto): Promise<RegisterResponseDto> {
        return await this.authService.register(regDto);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() authDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(authDto);
    }
}
