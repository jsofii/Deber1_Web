import {Controller, Get, Headers, Response, HttpCode} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(201)
  suma(@Headers() headers, @Response() response){
    const num1=Number(headers.num1)
    const num2=Number(headers.num2)
    if(num1 && num2) {
      return response.send({
        suma: num1 + num2
      });
    }else{
      return response.send({
        error: 'Datos no válidos'
      })
    }
  }
}
