import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CreateUserInput } from "../dtos/user.DTO";
import { UserSchema } from "../schema/user.schema";
import { HttpException, HttpStatus } from "@nestjs/common";

export class UserService {
  constructor (
    @InjectRepository(UserSchema)  
    private readonly userRepository: Repository<UserSchema>,
    private readonly connection: Connection,
  ){}
  async findAllUser() {
    return this.userRepository.find();
  }
  async createUser(input: CreateUserInput ){
    const {email} = input;
    const isUnique = await this.userRepository.findOne({where: {email}})
    
    if(isUnique) {
      throw new HttpException(
        {
            message: "input data invalid",
            error: "email already exist"
        },
        HttpStatus.BAD_REQUEST,
    );
    }
    const newUser = this.userRepository.create(input)
    await this.userRepository.create(newUser)
    return newUser


  }
}