import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';

export default interface ICreateRegisterUseCase {
  run(document: DocumentRegister): Promise<DocumentRegister>;
}
