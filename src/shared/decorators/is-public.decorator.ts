import { SetMetadata } from '@nestjs/common'

export const isPublicKey = 'isPublic'

export function isPublic() {
  return SetMetadata(isPublicKey, true)
}
