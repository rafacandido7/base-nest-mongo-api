import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { SignInDto, SignUpDto } from './dto'
import { isPublic } from '../../shared/decorators/is-public.decorator'

@ApiTags('Auth')
@isPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @ApiOperation({ summary: 'Sign in a user' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Post('signUp')
  @ApiOperation({ summary: 'Sign up a new user' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }
}
