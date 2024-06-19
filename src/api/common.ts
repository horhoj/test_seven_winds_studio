import { ApiError } from './common.types';

export const getApiErrors = (e: unknown): ApiError => {
  if (e instanceof Error) {
    return { errorMessage: e.message };
  }

  return { errorMessage: 'Unknown error' };
};
