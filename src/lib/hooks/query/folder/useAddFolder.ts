import { addFolder } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '../config';

export const useAddFolder = () => {
  return useMutation({
    mutationKey: [MUTATION_KEY.addFolder],
    mutationFn: addFolder,
  });
};
