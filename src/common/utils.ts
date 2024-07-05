import {
  ClientOptions,
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

export const TCPConfig = async (
  module: any,
  service: string,
): Promise<INestMicroservice> => {
  const serviceHostPort = process.env[`${service.toUpperCase()}_SERVICE`];
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
export const TCPProvider = (service: string) => {
  return {
    provide: service,
    useFactory: (configService: ConfigService) => {
      const serviceHostPort = configService.get<string>(
        `${service.toUpperCase()}_SERVICE`,
      );
      const [host, port] = serviceHostPort.split(':');

      const options: ClientOptions = {
        transport: Transport.TCP,
        options: {
          host,
          port: +port,
        },
      };

      return ClientProxyFactory.create(options);
    },
    inject: [ConfigService],
  };
};
// export const TCPPrwovider1 = (service: string) => {
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
