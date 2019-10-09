import {writable} from 'svelte/store';

export const authenticated = writable(false);

// This function returns a custom store.
// The only requirement to be a store is to
// correctly implement the subscribe method.
// See how this is used in home.svelte.
export function createCounter() {
  const {set, subscribe, update} = writable(0);

  // The set and update methods are not exposed.
  // Instead, increment, decrement, and reset methods are exposed.
  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n > 0 ? n - 1 : n),
    reset: () => set(0)
  };
}
