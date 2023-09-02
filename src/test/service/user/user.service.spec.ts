import { Test } from '@nestjs/testing';
import { UserEntity } from '../../../app/repository/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../../app/service/user/impl/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test-utils/test-utils';

describe('UserService', () => {

  let usersRepository: Repository<UserEntity>;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(UserEntity), useFactory: repositoryMockFactory },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    usersRepository = moduleRef.get(getRepositoryToken(UserEntity));
  });

  it('find by id', async () => {
    const mockUser = { id: 1 } as UserEntity;
    usersRepository.findOneBy = jest.fn(() => mockUser) as any;
    const user = await userService.findById(1);
    expect(user.id).toBe(mockUser.id);
  });

  it('find by login', async () => {
    const mockUser = { login: 'test' } as UserEntity;
    usersRepository.findOneBy = jest.fn(() => mockUser) as any;
    const user = await userService.findByLogin('test');
    expect(user.login).toBe(mockUser.login);
  });

});
