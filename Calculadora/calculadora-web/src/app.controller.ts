import {Controller, Get, Headers, Put, Delete, Response, Request, HttpCode, Post, Body, Query, Header} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {

  constructor(private readonly appService: AppService) {}
  @Get('/valorCookie')
  valorCookie(@Request() req, @Response() res)
    {

      res.send(
          {
            valor: req.signedCookies.contador
          }
      )
    }
  @Get('/suma')
  @HttpCode(200)
  suma(@Headers() header, @Response() response, @Request() req){
    const num1=Number(header.num1)
    const num2=Number(header.num2)
    const suma=num1+num2;
    const miCookie= Number(req.cookies.contador)
    if(miCookie) {
      console.log("si hay cookies")
      if(!((miCookie-suma)<=0)){
        response.cookie(
            'contador', miCookie - suma, {  overwrite: true}

        )
      }else{
        response.send(
            {
              nombreUsuario:'Sofía',

              resultado: suma,

              mensaje: 'Se le terminaron sus puntos'
            }
        )
      }



    }else{
      response.cookie(
          'contador', 100, {}
      )
    }
    if(num1 && num2) {
      return response.send({
        suma: num1 + num2
      });
    }else{
      return response.send({
        error: 'Datos no válidos.'
      })
    }
  }
  @Get('/prueba')
  @HttpCode(200)
  prueba( @Response() response, @Request() req){

    return response.send({
      error: 'Todo bien. $req.cookies'
    })

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
        error: 'Datos no válidos.'
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
          error: 'Datos no válidos.'
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
      //  nombreUsuario:
        division: num1 / num2
      });
    }else{
      return response.send({
        error: 'Datos no válidos'
      })
    }

  }
  esPrimeraVez(cookies){
    if(cookies.contador){
      return true;
    }else{
      return false;
    }

  }


}
