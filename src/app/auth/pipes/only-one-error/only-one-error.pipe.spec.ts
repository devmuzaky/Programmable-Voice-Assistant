import { OnlyOneErrorPipe } from './only-one-error.pipe';

describe('OnlyOneErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyOneErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
