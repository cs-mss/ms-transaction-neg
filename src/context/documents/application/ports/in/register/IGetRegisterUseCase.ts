import { DocumentRegister } from '@context/documents/domain/class/DocumentRegister';

export default interface IGetRegisterUseCase {
  run(registerId: number): Promise<DocumentRegister>;
}
