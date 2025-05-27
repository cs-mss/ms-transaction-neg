import { DocumentOrder } from '../../../../domain/class/DocumentOrder';

export default interface IGetAllOrderUseCase {
  run(): Promise<DocumentOrder[]>;
}
