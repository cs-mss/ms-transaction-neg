import { DocumentCertificate } from '@context/documents/domain/class/DocumentCertificate';

export default interface ICreateCertificateUseCase {
  run(document: DocumentCertificate): Promise<DocumentCertificate>;
}
