import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { useState, useEffect } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")!) || false,
  );

  useEffect(() => {
    if (persist) {
      localStorage.setItem("persist", JSON.stringify(persist));
    }
  }, [persist]);

  return [persist, setPersist];
};
