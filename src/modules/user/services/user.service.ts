import { InjectRepository } from "@nestjs/typeorm";
import { Connection, ObjectId, Repository } from "typeorm";
import { CreateUserInput } from "../dtos/user.DTO";
import { UserSchema } from "../schema/user.schema";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { random } from "src/helpers";

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserSchema)  
    private readonly userRepository: Repository<UserSchema>,
    private readonly connection: Connection,
  ){}
  async findAllUser() {
    return this.userRepository.find();
  }
  async findUserById(id: ObjectId): Promise<UserSchema> {
    const user = await this.userRepository.findOneBy({id: id})
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user
  }
  async createUser(input: CreateUserInput ){
    const {email, firstName, lastName, password} = input;
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

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = this.userRepository.create({
    email : email,
    firstName : firstName,
    lastName : lastName,
    password : hashedPassword,
    sessionToken: null
  });
  const newUser = this.userRepository.save(user);
  return newUser;

  }
}