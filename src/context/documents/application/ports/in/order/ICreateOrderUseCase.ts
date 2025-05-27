import { DocumentOrder } from '../../../../domain/class/DocumentOrder';

export default interface ICreateOrderUseCase {
  run(order: DocumentOrder): Promise<DocumentOrder>;
}
