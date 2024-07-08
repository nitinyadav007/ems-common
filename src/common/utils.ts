import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { BadRequestException, INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { timeout } from 'rxjs';

enum EUserType {
  ADMIN = 'admin',
  USER = 'user',
}

interface IJwtPayload {
  sub: string;
  type: EUserType;
}

interface ITCPPayload<T> {
  data: T;
  user: IJwtPayload;
}

export async function sendRequest<T, U>(
  cmd: string,
  data: U,
  user: IJwtPayload,
  service: string,
  client: ClientProxy,
): Promise<T> {
  return await client
    .send<T, ITCPPayload<U>>({ service, cmd }, { data, user })
    .pipe(timeout(1000))
    .toPromise()
    .catch((e) => {
      console.error(
        e,
        e.code,
        e.cause,
        'error in sendRequest',
        service,
        cmd,
        data,
        user,
      );
      throw new BadRequestException({
        message: 'Server Error',
        code: 500,
        service: service,
        cmd: cmd,
      });
    });
}

export const TCPConfig = async (
  module: any,
  service: string,
): Promise<INestMicroservice> => {
  const serviceHostPort = process.env[`${service.toUpperCase()}`];
  if (!serviceHostPort) {
    throw new Error(`Service ${service} not found in .env file`);
  }
  const [host, port] = serviceHostPort.split(':');

  const options: NestApplicationContextOptions & MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      host,
      port: +port,
    },
  };

  return await NestFactory.createMicroservice<MicroserviceOptions>(
    module,
    options,
  );
};
export const TCPProvider = (service: string) => ({
  provide: service,
  useFactory: () => {
    const serviceHostPort = process.env[service];
    if (!serviceHostPort) {
      throw new Error(`Environment variable ${service} is not defined`);
    }
    const [host, port] = serviceHostPort.split(':');

    const options: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host,
        port: +port, // Convert port to number
      },
    };

    return ClientProxyFactory.create(options);
  },
}); // export const TCPPrwovider1 = (service: string) => {
//   return {
//     provide: service,
//     useFactory: (configService: ConfigService) => {
//       const options: ClientOptions = {
//         transport: Transport.RMQ,
//         options: {
//           urls: [
//             `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}/`,
//           ],
//           queue: `${service.toLowerCase()}_queue`,
//           queueOptions: {
//             durable: false,
//           },
//         },
//       };
//       return ClientProxyFactory.create(options);
//     },
//     inject: [ConfigService],
//   };
// };
//
// export const TCPConfig = async (
//   module: any,
//   service: string,
// ): Promise<INestMicroservice> => {
//   const serviceURI = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}/`;
//   console.log(serviceURI, 'serviceURI');
//   const options: NestApplicationContextOptions & MicroserviceOptions = {
//     transport: Transport.RMQ,
//     options: {
//       urls: [serviceURI],
//       queue: `${service.toLowerCase()}_queue`,
//       queueOptions: {
//         durable: false,
//       },
//     },
//   };
//   return await NestFactory.createMicroservice<MicroserviceOptions>(
//     module,
//     options,
//   );
// };
