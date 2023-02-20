import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  test('it debounces a value and returns the debounced value', () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: '', delay: 500 },
      }
    );

    expect(result.current).toEqual('');

    act(() => {
      rerender({ value: 'test', delay: 500 });
    });

    expect(result.current).toEqual('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual('test');

    act(() => {
      rerender({ value: 'another value', delay: 500 });
    });

    expect(result.current).toEqual('test');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual('another value');

    jest.useRealTimers();
  });
});
