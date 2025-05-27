import { DocumentCertificate } from '../class/DocumentCertificate';
import { DocumentRegister } from '../class/DocumentRegister';
import { DocumentOrder } from '../class/DocumentOrder';

type DoucmentsAviable = DocumentCertificate | DocumentRegister | DocumentOrder;

export default interface IDocumentRepository<T extends DoucmentsAviable> {
  findById(number: number): Promise<T>;

  findAll(): Promise<T[]>;

  create(document: T): Promise<T>;
}
