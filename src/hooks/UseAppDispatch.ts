import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';

// Кастомный хук для типизированного dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
