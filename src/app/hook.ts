import { useState, useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist') as string) || false
  );

  useEffect(() => {
    if (persist) {
      localStorage.setItem('persist', JSON.stringify(persist));
    }
  }, [persist]);

  return [persist, setPersist];
};
