import React, { Component } from 'react';
import { render } from 'react-dom';

/* global describe, it, expect */
describe('一个基本方法测试', () => {
  it('是否相等', () => {
    expect('Hello World!').to.contain('Hello World!');
  });
});
