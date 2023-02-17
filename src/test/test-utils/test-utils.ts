import { Repository } from 'typeorm';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  findBy: jest.fn(entities => entities),
  delete: jest.fn(),
  save: jest.fn(),
}));

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};
