import { compare, hash } from 'bcryptjs'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from './../users/users.service'

import { SignInDto, SignUpDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authenticateDto: SignInDto) {
    const { email, password } = authenticateDto

    const user = await this.usersService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!')
    }

    const isPasswordMatched = await compare(password, user.password)

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials!')
    }

    const accessToken = await this.generateAccessToken(user.id)

    if (!accessToken) {
      throw new Error()
    }

    return { accessToken }
  }

  async signUp(signUpDto: SignUpDto) {
    await this.usersService.validateCretendials(signUpDto)

    const hashedPassword = await hash(signUpDto.password, 12)

    const newUser = await this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
    })

    const accessToken = await this.generateAccessToken(newUser._id)

    return { accessToken }
  }

  private async generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId })
  }
}
