import Adder from '../src/components/Adder.svelte';

export default {
  title: 'Adder'
};

export const untitled = () => ({
  Component: Adder
});

export const titled = () => ({
  Component: Adder,
  props: {title: 'My Title'}
});
