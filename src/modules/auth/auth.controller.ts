import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({
        description: 'Loguea un usuario'
    })
    @ApiBody({
        type: AuthDto,
        description: 'Nos loguea en la aplicación'
    })
    @ApiResponse({
        status: 201,
        description: 'Logueado correctamente'
    })
    @ApiResponse({
        status: 401,
        description: `Usuario no autorizado`
    })
    login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto);
    }

}
