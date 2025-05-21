import { Injectable } from '@nestjs/common';
//Logical Part

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
