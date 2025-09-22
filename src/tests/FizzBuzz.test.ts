import { describe, it, expect } from 'vitest';
import { fizzBuzzLogic } from '../components/FizzBuzz/FizzBuzz';

describe('FizzBuzz Logic', () => {
  it('returns "Fizz" for multiples of 3', () => {
    expect(fizzBuzzLogic(3)).toBe('Fizz');
    expect(fizzBuzzLogic(9)).toBe('Fizz');
  });

  it('returns "Buzz" for multiples of 5', () => {
    expect(fizzBuzzLogic(5)).toBe('Buzz');
    expect(fizzBuzzLogic(10)).toBe('Buzz');
  });

  it('returns "FizzBuzz" for multiples of both 3 and 5', () => {
    expect(fizzBuzzLogic(15)).toBe('FizzBuzz');
    expect(fizzBuzzLogic(30)).toBe('FizzBuzz');
  });

  it('returns the number as string for other numbers', () => {
    expect(fizzBuzzLogic(1)).toBe('1');
    expect(fizzBuzzLogic(7)).toBe('7');
  });
});