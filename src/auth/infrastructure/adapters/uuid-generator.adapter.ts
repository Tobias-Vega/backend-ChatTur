import { Injectable } from '@nestjs/common';
import { UUIDGenerator } from 'src/auth/domain/ports/uuid-generator.port';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UUIDGeneratorAdapter implements UUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}