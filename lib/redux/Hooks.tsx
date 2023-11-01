import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const usePokeAppDispatch = () => useDispatch<AppDispatch>();
export const usePokeAppSelector: TypedUseSelectorHook<RootState> = useSelector;
