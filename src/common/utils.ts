import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export function TCPProvider(serviceName: string): ClientsModuleOptions {
  const serviceConfig = process.env[serviceName];
  if (!serviceConfig) {
    throw new Error(`Service configuration for ${serviceName} not found`);
  }

  const [host, port] = serviceConfig.split(':');
  return [
    {
      name: serviceName,
      transport: Transport.TCP,
      options: {
        host,
        port: parseInt(port, 10),
      },
    },
  ];
}
