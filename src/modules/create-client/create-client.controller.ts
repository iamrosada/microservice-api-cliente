import { Request, Response } from "express";
import { CreateClientUseCase } from "./create-client.usecase";

export class CreateCustomerController {
  constructor() {}
  //this method will call the execute,
  //execute is a function  that will verify if customer exist
  async handle(request: Request, response: Response) {
    const useCase = new CreateClientUseCase();

    try {
      const result = await useCase.execute(request.body);

      return response.json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
