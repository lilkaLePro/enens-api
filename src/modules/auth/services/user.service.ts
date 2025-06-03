import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ConnectUserInput, CreateUserInput } from '../dtos/user.DTO';
import { UserSchema } from '../schema/user.schema';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
    private readonly jwtService: JwtService,
  ) {}
  async findAllUser() {
    return this.userRepository.find();
  }
  async getUserByEmail(email: string): Promise<UserSchema> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
  async currentUser(token: string): Promise<UserSchema> {
    const user = await this.userRepository.findOneOrFail({
      where: { sessionToken: token },
    });
    if(!user) {
      throw new HttpException(
        {
          message: 'Error token fetching current user',
          error: 'Token Error'
        },
        HttpStatus.BAD_REQUEST
      )
    }
    return user;
  }
  async findById(id: string): Promise<UserSchema> {
    const user = await this.userRepository.findOneBy({
      _id: new ObjectId(id)
    })
    if (!user) {
      throw new NotFoundException(`User with email ${id} not found`);
    }
    return user;
  }
  async createUser(input: CreateUserInput): Promise<UserSchema> {
    const { email, firstName, lastName, password, role } = input;
    const isUnique = await this.userRepository.findOne({ where: { email } });

    if (isUnique) {
      throw new HttpException(
        {
          message: 'User already exist, please login !',
          error: 'email already exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      sessionToken: null,
      role: role,
    });
    const newUser = await this.userRepository.save(user);

    const payload = { id: newUser._id, email: newUser.email };
    const sessionToken = await this.jwtService.signAsync(payload, {
      secret: 'JWT_SECRET',
      expiresIn: '2d',
    });
    newUser.sessionToken = sessionToken;
    await this.userRepository.save(newUser);

    return newUser;
  }

  async loginUser(input: ConnectUserInput): Promise<UserSchema> {
    const { email, password } = input;

    const isExistUser = await this.userRepository.findOne({ where: { email } });
    if (!isExistUser) {
      throw new HttpException("user doesn't exist", HttpStatus.BAD_REQUEST);
    }
    const isMatch = await bcrypt.compare(password, isExistUser.password);
    if (!isMatch) {
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
    }
    const payload = { id: isExistUser._id, email: isExistUser.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: 'JWT_SECRET',
      expiresIn: '2d',
    });
    const sessionToken = token;
    console.log(sessionToken);

    await this.userRepository.update(
      { _id: isExistUser._id },
      { sessionToken },
    );

    return {
      ...isExistUser,
      sessionToken,
    };
  }
}
