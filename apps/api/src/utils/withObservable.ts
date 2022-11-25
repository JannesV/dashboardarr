import { Observable } from "rxjs";
import { $$asyncIterator } from "iterall";

export function withCancel<T>(
  asyncIterator: AsyncIterator<T | undefined>,
  onCancel: () => void
): AsyncIterator<T | undefined> {
  return {
    ...asyncIterator,
    return() {
      onCancel();
      return asyncIterator.return
        ? asyncIterator.return()
        : Promise.resolve({ value: undefined, done: true });
    },
  };
}

interface PubSub {
  publish: (trigger: string, data: any) => void;
  asyncIterator: (trigger: string) => AsyncIterator<{}>;
}

export function withObservable<T>(
  observable: Observable<T>,
  pubSub: PubSub,
  trigger: string
) {
  const subscription = observable.subscribe((data) => {
    pubSub.publish(trigger, {
      [trigger]: data,
    });
  });

  return withCancel(pubSub.asyncIterator(trigger), () => {
    subscription.unsubscribe();
  });
}

export const withStaticFields = (
  asyncIterator: AsyncIterator<any>,
  onReturn: () => void
) => {
  return {
    async next() {
      return asyncIterator.next();
    },
    return() {
      onReturn();
      return asyncIterator.return();
    },
    throw(error) {
      return Promise.reject(error);
    },
    [$$asyncIterator]() {
      return this;
    },
  } as any;
};
