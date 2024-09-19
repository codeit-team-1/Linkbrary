import { ComponentType } from 'react';
import { match } from 'ts-pattern';
import { FullPageLoading } from '../../components/loading';

export interface LoadingProps {
  isLoading: boolean;
}

export const withLoading = <T extends LoadingProps>(
  WrappedComponent: ComponentType<Omit<T, 'isLoading'>>,
) => {
  return ({ isLoading, ...rest }: T) => {
    return match(isLoading)
      .with(true, () => (
        <>
          <FullPageLoading />
          <WrappedComponent {...rest} />
        </>
      ))
      .with(false, () => <WrappedComponent {...rest} />)
      .exhaustive();
  };
};
