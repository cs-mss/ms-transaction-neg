import { DocumentOrder } from '../../../../domain/class/DocumentOrder';

export default interface IGetOrderUseCase {
  run(id: number): Promise<DocumentOrder>;
}
