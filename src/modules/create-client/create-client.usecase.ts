import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/provider/kafka/producer";

type CreateClientRequest = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export class CreateClientUseCase {
  constructor() {}

  async execute(data: CreateClientRequest) {
    //this way, verify on database if exist other customer with the same email
    const customer = await prismaClient.client.findFirst({
      where: {
        email: data.email,
      },
    });
    //verify if user exist, if exist throw a error
    if (customer) throw new Error("Customer already exist!");

    //to create a customer
    const customerCreated = await prismaClient.client.create({
      data: {
        ...data,
      },
    });
    
    const kafkaProducer = new KafkaSendMessage();
    await kafkaProducer.execute("CUSTOMER_CREATED", {
      id: customerCreated.id,
      email: customerCreated.email,
    });
    //return customer created
    return customerCreated;
  }
}
