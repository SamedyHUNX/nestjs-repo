import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.singup('samedyhunx@gmail.com', 'fsajhfkj');

    expect(user.password).not.toEqual('fsajhfkj');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'samedy@gmail.com', password: '123456' } as User,
      ]);

    await expect(
      service.singup('samedy@gmail.com', '123456'),
    ).rejects.toThrow();
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('samedydasd@gmail.com', '123456'),
    ).rejects.toThrow();
  });

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          email: 'ahkdajd@gmail.com',
          password: 'dajfjfkl',
        } as User,
      ]);

    await expect(
      service.signin('fsdjhkfjk@gmail.com', '123456'),
    ).rejects.toThrow();
  });

  it('returns a user if correct password is provided', async () => {
    await service.singup('fhskfjk@gmail.com', 'mypassword');

    const user = await service.signin('fhskfjk@gmail.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
