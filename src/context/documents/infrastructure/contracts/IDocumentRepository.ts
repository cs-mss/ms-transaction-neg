import { DocumentCertificate } from '../../domain/class/DocumentCertificate';
import { DocumentRegister } from '../../domain/class/DocumentRegister';

type DoucmentsAviable = DocumentCertificate | DocumentRegister;

export default interface IDocumentRepository<T extends DoucmentsAviable> {
  findById(number: number): Promise<T>;

  findAll(): Promise<T[]>;

  create(document: T): Promise<T>;
}
