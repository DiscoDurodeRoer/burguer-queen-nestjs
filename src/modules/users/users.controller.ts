import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post()
    @ApiOperation({
        description: 'Crea un usuario'
    })
    @ApiBody({
        type: UserDto,
        description: 'Crea un user usando un UserDto'
    })
    @ApiResponse({
        status: 201,
        description: 'Usuario creado correctamente'
    })
    createUser(@Body() user: UserDto) {
        return this.userService.create(user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({
        description: 'Obtengo la información de un usuario'
    })
    @ApiQuery({
        name: 'email',
        description: 'Email del usuario a devolver'
    })
    @ApiResponse({
        status: 200,
        description: 'Usuario devuelto correctamente'
    })
    getUser(@Query('email') email: string) {
        return this.userService.findUserbyEmailNoPassword(email);
    }

}
