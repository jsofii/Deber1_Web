import {Controller, Get, Headers, Put, Delete, Response, HttpCode, Post, Body, Query, Header} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/suma')
  @HttpCode(200)
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
  @Post('/resta')
  @HttpCode(201)
  resta(@Body() body, @Response() response){
    const num1=Number(body.num1)
    const num2=Number(body.num2)
    if(num1 && num2) {
      return response.send({
        resta: num1 - num2
      });
    }else{
      return response.send({
        error: 'Datos no válidos'
      })
    }
  }

  @Put('/multiplicacion')
  @HttpCode(202)
    multiplicacion(@Query() query, @Response() response){
      const num1=Number(query.num1)
      const num2=Number(query.num2)
      if(num1 && num2) {
        return response.send({
          multiplicacion: num1 * num2
        });
      }else{
        return response.send({
          error: 'Datos no válidos'
        })
      }

    }
  @Delete('/division')
  @HttpCode(203)
  division(@Query() query, @Headers() header, @Response() response){
    const num1=Number(query.num1)
    const num2=Number(header.num2)
    if(num1 && num2 && num2!=0) {
      return response.send({
        division: num1 / num2
      });
    }else{
      return response.send({
        error: 'Datos no válidos'
      })
    }

  }


}
