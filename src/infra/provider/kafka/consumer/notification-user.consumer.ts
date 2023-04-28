import { kafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
  customerId: string;
  status: string;
};

export async function createCustomerConsumer() {
  console.log("CUSTOMER CONSUMER");
  const consumer = await kafkaConsumer("ORDER_STATUS");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const menssageToString = message.value!.toString();
      const statusConsumer = JSON.parse(menssageToString) as CustomerConsumer;

      //Enviar mensagem por email
      console.log(
        `ATUALIZAÇÃO DE STATUS - Client ${statusConsumer.customerId}- STATUS DO PEDIDO -${statusConsumer.status} `
      );
    },
  });
}

createCustomerConsumer();
