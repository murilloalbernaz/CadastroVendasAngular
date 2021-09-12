import { Cliente } from "src/app/clientes/cliente";

export class ServicoBusca{
    descricao?: string;
    cliente: Cliente = new Cliente();
    valor?: number;
    data?: string;
}