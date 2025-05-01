import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async create(user: UserDto) {

        // Buscamos si existe
        const userExists = await this.findUserbyEmail(user.email);
        if (userExists) {
            throw new ConflictException('El usuario con email ' + user.email + ' existe')
        }

        // Creao el documento del usuario
        const u = new this.userModel(user);
        await u.save();
        // Le quito el password para no mostrarlo
        u.password = undefined;
        return u;
    }

    /**
    * Busca el usuario por su email
    * @param email 
    * @returns 
    */
    findUserbyEmail(email: string) {
        return this.userModel.findOne({ email: email.toLowerCase() })
    }

    /**
    * Busca el usuario por su email
    * @param email 
    * @returns 
    */
    findUserbyEmailNoPassword(email: string) {
        return this.userModel.findOne({ email: email.toLowerCase() }, { password: 0 })
    }

}
