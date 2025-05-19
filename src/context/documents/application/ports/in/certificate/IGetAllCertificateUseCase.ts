import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';

export default interface IGetAllCertificateUseCase {
  run(): Promise<DocumentCertificate[]>;
}
