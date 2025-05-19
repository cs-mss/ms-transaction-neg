import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import IDocumentRepository from '../../domain/repositories/IDocumentRepository';
import { DocumentRegister } from '../../domain/class/DocumentRegister';
import { RegisterEntity } from '../entities/register/Register.entity';

@Injectable()
export class RegisterRepository
  implements IDocumentRepository<DocumentRegister>
{
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepository: Repository<RegisterEntity>,
  ) {}

  async findById(RegisterId: number): Promise<DocumentRegister> {
    const RegisterEntity = await this.registerRepository.findOne({
      where: { id: RegisterId },
      relations: ['certificate'],
    });

    if (!RegisterEntity) {
      throw new Error(`Register not found with id: ${RegisterId}`);
    }

    return RegisterEntity.toDomain();
  }

  async findAll(): Promise<DocumentRegister[]> {
    const RegisterEntity = await this.registerRepository.find({
      relations: ['certificate'],
    });

    const RegisterList: DocumentRegister[] = [];
    RegisterEntity.forEach((value) => {
      RegisterList.push(value.toDomain());
    });
    return RegisterList;
  }

  async create(plan: DocumentRegister): Promise<DocumentRegister> {
    const registerEntity = RegisterEntity.fromDomain(plan);
    const RegisterCreated = await this.registerRepository.save(registerEntity, {
      reload: true,
    });
    if (!RegisterCreated) {
      throw new Error();
    }
    return registerEntity.toDomain();
  }
}
