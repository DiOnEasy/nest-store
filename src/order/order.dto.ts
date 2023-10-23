import { EnumOrderStatus } from "@prisma/client";
import { ArrayMinSize, IsEnum, IsNumber, IsOptional } from "class-validator";

export class OrderDto {
    @IsOptional()
    @IsEnum(EnumOrderStatus)
    status: EnumOrderStatus

    @ArrayMinSize(1)
    items: OrderItemDto[]
}

export class OrderItemDto{
@IsNumber()
quantity: number

@IsNumber()
price: number

@IsNumber()
productId: number
}