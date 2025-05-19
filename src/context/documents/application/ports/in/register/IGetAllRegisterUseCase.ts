import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';

export default interface IGetAllRegisterUseCase {
  run(): Promise<DocumentRegister[]>;
}
