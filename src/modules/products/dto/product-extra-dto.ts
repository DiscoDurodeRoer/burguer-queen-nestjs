import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductExtraOption } from "./product-extra-option-dto";

export class ProductExtraDto {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        name: 'name',
        type: String,
        required: true,
        description: 'Nombre del bloque'
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        name: 'img',
        type: String,
        required: true,
        description: 'Imagen del bloque'
    })
    img: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({
        name: 'options',
        type: [ProductExtraOption],
        required: false,
        description: 'Opciones disponibles del bloque'
    })
    options?: ProductExtraOption[];
}