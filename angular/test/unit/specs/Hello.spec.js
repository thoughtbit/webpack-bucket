import 'angular';
import 'angular-mocks';

/* global describe, it, expect */
describe('一个基本方法测试', () => {
  it('字符是否恒等', () => {
    expect('abcd').to.equal('abcd');
  });
});
