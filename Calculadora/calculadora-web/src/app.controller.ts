import {
    Controller,
    Get,
    Headers,
    Put,
    Delete,
    Response,
    Request,
    HttpCode,
    Post,
    Body,
    Query,
    Header
} from '@nestjs/common';
import {AppService} from './app.service';
import * as Joi from '@hapi/joi';

@Controller('/api')
export class AppController {

    constructor(private readonly appService: AppService) {
    }

    @Get('/valorCookie')
    valorCookie(@Request() req, @Response() res) {

        res.send(
            {
                valor: req.signedCookies.contador
            }
        )
    }
    validarNumros(num1, num2) {
        const esquemaValidacionNumero = Joi
            .object()
            .keys({
                numero1: Joi.number().integer().required(),
                numero2: Joi.number().integer().required()
            });
        const objetoValidacion = {
            numero1: num1,
            numero2: num2
        };
        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);
        if(resultado.error==null){
            return true;
        }else{
            return false;
        }
    }
    @Get('/suma')
    @HttpCode(200)
    suma(@Headers() header, @Response() response, @Request() req) {
        const num1 = Number(header.num1)
        const num2 = Number(header.num2)

        if (this.validarNumros(num1,num2)) {

            const suma = num1 + num2;
            const miCookie = Number(req.signedCookies.contador)
            if (miCookie) {
                console.log("puntos disponibles" + req.signedCookies.contador)
                if (!((miCookie - suma) <= 0)) {
                    response.cookie(
                        'contador', miCookie - suma, {overwrite: true, signed:true}
                    )
                } else {
                    response.send(
                        {
                            nombreUsuario: 'Sofía',

                            resultado: suma,

                            mensaje: 'Se le terminaron sus puntos'
                        }
                    )
                }
            } else {
                response.cookie(
                    'contador', 100, {signed: true}
                )
            }
            return response.send({
                suma: suma
            });
        } else {
            response.send(
                {
                    Error: 'Datos no válidos.'
                }
            )
        }

    }



    @Post('/resta')
    @HttpCode(201)
    resta(@Body() body, @Response() response, @Request() req) {
        const num1 = Number(body.num1)
        const num2 = Number(body.num2)

        if (this.validarNumros(num1,num2)) {

            const resta = num1 - num2;
            const miCookie = Number(req.signedCookies.contador)
            if (miCookie) {
                console.log("puntos disponibles" + req.signedCookies.contador)
                if (!((miCookie - resta) <= 0)) {
                    response.cookie(
                        'contador', miCookie - resta, {overwrite: true, signed:true}
                    )
                } else {
                    response.send(
                        {
                            nombreUsuario: 'Sofía',

                            resultado: resta,
                            mensaje: 'Se le terminaron sus puntos'
                        }
                    )
                }
            } else {
                response.cookie(
                    'contador', 100, {signed: true}
                )
            }
            return response.send({
                resta: resta
            });
        } else {
            response.send(
                {
                    Error: 'Datos no válidos.'
                }
            )
        }

    }

    @Put('/multiplicacion')
    @HttpCode(202)
    multiplicacion(@Query() query, @Response() response, @Request() req) {
        const num1 = Number(query.num1)
        const num2 = Number(query.num2)

        if (this.validarNumros(num1,num2)) {

            const multiplicacion = num1 * num2;
            const miCookie = Number(req.signedCookies.contador)
            if (miCookie) {
                console.log("puntos disponibles" + req.signedCookies.contador)
                if (!((miCookie - multiplicacion) <= 0)) {
                    response.cookie(
                        'contador', miCookie - multiplicacion, {overwrite: true, signed:true}
                    )
                } else {
                    response.send(
                        {
                            nombreUsuario: 'Sofía',

                            resultado: multiplicacion,

                            mensaje: 'Se le terminaron sus puntos'
                        }
                    )
                }
            } else {
                response.cookie(
                    'contador', 100, {signed: true}
                )
            }
            return response.send({
                multiplicacion: multiplicacion
            });
        } else {
            response.send(
                {
                    Error: 'Datos no válidos.'
                }
            )
        }


    }

    @Delete('/division')
    @HttpCode(203)
    division(@Query() query, @Headers() header, @Response() response, @Request() req) {
        const num1 = Number(query.num1)
        const num2 = Number(header.num2)


        if (this.validarNumros(num1,num2) && num2!=0) {

            const division = num1 / num2;
            const miCookie = Number(req.signedCookies.contador)
            if (miCookie) {
                console.log("puntos disponibles" + req.signedCookies.contador)
                if (!((miCookie - division) <= 0)) {
                    response.cookie(
                        'contador', miCookie - division, {overwrite: true, signed: true}
                    )
                } else {
                    response.send(
                        {
                            nombreUsuario: 'Sofía',

                            resultado: division,

                            mensaje: 'Se le terminaron sus puntos'
                        }
                    )
                }
            } else {
                response.cookie(
                    'contador', 100, {signed: true}
                )
            }
            return response.send({
                division: division
            });
        } else {
            response.send(
                {
                    Error: 'Datos no válidos.'
                }
            )
        }


    }




}
