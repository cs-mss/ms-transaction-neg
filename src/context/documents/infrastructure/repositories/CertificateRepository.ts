import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import IDocumentRepository from '../contracts/IDocumentRepository';
import { CertificateEntity } from '../entities/certificate/Certificate.entity';
import { DocumentCertificate } from '../../domain/class/DocumentCertificate';

@Injectable()
export class CertificateRepository
  implements IDocumentRepository<DocumentCertificate>
{
  constructor(
    @InjectRepository(CertificateEntity)
    private readonly certificateRepository: Repository<CertificateEntity>,
  ) {}

  async findById(certificateId: number): Promise<DocumentCertificate> {
    const certificateEntity = await this.certificateRepository.findOne({
      where: { id: certificateId },
    });

    if (!certificateEntity) {
      //throw new GenericNotFoundError(`Plan not found with id: ${planId}`);
      throw new Error();
    }

    return certificateEntity.toDomain();
  }

  async findAll(): Promise<DocumentCertificate[]> {
    const certificateEntity = await this.certificateRepository.find();

    const certificateList: DocumentCertificate[] = [];
    certificateEntity.forEach((value) => {
      certificateList.push(value.toDomain());
    });
    return certificateList;
  }

  async create(certificate: DocumentCertificate): Promise<DocumentCertificate> {
    const certificateEntity = CertificateEntity.fromDomain(certificate);
    const certificateCreated =
      await this.certificateRepository.save(certificateEntity);
    if (!certificateCreated) {
      throw new Error();
    }
    return certificateCreated.toDomain();
  }
}
