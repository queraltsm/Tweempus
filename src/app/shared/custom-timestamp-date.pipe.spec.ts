import { CustomTimestampDatePipe } from './custom-timestamp-date.pipe';

describe('CustomTimestampDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomTimestampDatePipe();
    expect(pipe).toBeTruthy();
  });
});
