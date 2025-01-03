import { InjectRepository } from "@nestjs/typeorm";
import { Connection, ObjectId, Repository } from "typeorm";
import { ConnectUserInput, CreateUserInput } from "../dtos/user.DTO";
import { UserSchema } from "../schema/user.schema";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserSchema)  
    private readonly userRepository: Repository<UserSchema>,
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
  ){}
  async findAllUser() {
    return this.userRepository.find();
  }
  async findUserById(id: ObjectId): Promise<UserSchema> {
    const user = await this.userRepository.findOneBy({id})
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
  const newUser = await this.userRepository.save(user);

  const payload = {id: newUser.id, email: newUser.email}
  const token = await this.jwtService.signAsync(payload, {secret: 'JWT_SECRET'})

  return {
      ...newUser, token
    }

  }

  async loginUser(input: ConnectUserInput): Promise<UserSchema> {
    const {email, password} = input;

    const isExistUser = await this.userRepository.findOne({where: {email}});
    if(!isExistUser) {
      throw new HttpException("user doesn't exist", HttpStatus.BAD_REQUEST);
    };
    const isMatch = await bcrypt.compare(password, isExistUser.password);
    if(!isMatch) {
      throw new HttpException("Incorrect password", HttpStatus.BAD_REQUEST);
    };
    const payload = { id: isExistUser.id, email: isExistUser.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: 'JWT_SECRET',
      expiresIn: '1h',
    });

    return {
        id: isExistUser.id,
        firstName: isExistUser.firstName,
        lastName: isExistUser.lastName,
        email: isExistUser.email,
      }
};
}