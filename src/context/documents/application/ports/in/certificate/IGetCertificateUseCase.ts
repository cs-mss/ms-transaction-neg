import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';

export default interface IGetCertificateUseCase {
  run(certificateId: number): Promise<DocumentCertificate>;
}
