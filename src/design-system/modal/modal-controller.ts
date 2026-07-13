type Listener = () => void;

export type ModalController<T extends Record<string, unknown>> = T & {
  isOpen: boolean;
  subscribe: (listener: Listener) => () => void;
  open: () => void;
  close: () => void;
  snapshot: () => T & { isOpen: boolean };
};

export const createModalController = <T extends Record<string, unknown>>(
  defaults: T,
): ModalController<T> => {
  type State = T & { isOpen: boolean };

  let state: State = { ...defaults, isOpen: false };
  const listeners = new Set<Listener>();

  const notify = () => listeners.forEach((listener) => listener());

  const api = {
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    snapshot(): State {
      return state;
    },
    open() {
      state = { ...state, isOpen: true };
      notify();
    },
    close() {
      state = { ...state, isOpen: false };
      notify();
    },
  };

  return new Proxy(api, {
    get(target, prop: string | symbol) {
      if (typeof prop === 'string' && prop in target) {
        return target[prop as keyof typeof target];
      }

      if (typeof prop === 'string') {
        return state[prop as keyof State];
      }

      return undefined;
    },
    set(_target, prop: string | symbol, value) {
      if (typeof prop === 'string') {
        state = { ...state, [prop]: value };
        notify();
      }

      return true;
    },
  }) as unknown as ModalController<T>;
};
