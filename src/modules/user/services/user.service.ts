import { InjectRepository } from "@nestjs/typeorm";
import { Connection, ObjectId, Repository } from "typeorm";
import { CreateUserInput } from "../dtos/user.DTO";
import { UserSchema } from "../schema/user.schema";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { authentication, random } from "src/helpers";

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
    const findUser = await this.userRepository.findOne({where: {id}})
    if(!findUser) {
      throw new HttpException(
        {
          message: "User doesn't exist",
          error: "invalid data"
        },
        HttpStatus.BAD_REQUEST
      )
    }
    return findUser
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
    const salt = random();
  const hashedPassword = authentication(salt, password);

  const user = this.userRepository.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    sessionToken: null
  });

  return this.userRepository.save(user);

  }
}