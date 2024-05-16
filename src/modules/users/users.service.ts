import { Types } from 'mongoose'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { UsersRepository } from './users.repository'
import { User } from './schemas/users.schema'

import { CreateUserDto } from './dto'

import { Projection } from '@/shared/types'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCretendials(createUserDto)

    return await this.usersRepository.create(createUserDto)
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email })

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    return user
  }

  async validateCretendials(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto

    const [emailExists, usernameExists] = await Promise.all([
      this.usersRepository.findOne({ email }),
      this.usersRepository.findOne({ username }),
    ])

    if (emailExists) {
      throw new ConflictException('This Email already in use.')
    }

    if (usernameExists) {
      throw new ConflictException('This Username already in use.')
    }
  }

  async findOne(
    id: string | Types.ObjectId,
    projection: Projection<User>,
  ): Promise<User> {
    const user = await this.usersRepository.findOneById(id, projection)
    if (!user) {
      throw new NotFoundException('User not found.')
    }
    return user
  }
}
