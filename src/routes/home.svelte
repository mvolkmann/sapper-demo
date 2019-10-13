<script>
  import Adder from '../components/Adder.svelte';
  import {createCounter} from '../stores.js';

  const counter = createCounter();
</script>

<style>
  a {
    border: solid gray 1px;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 4px;
    text-decoration: none;
  }
  .counter {
    display: flex;
    align-items: center;
  }

  .counter > * {
    margin-left: 0.5rem;
  }

  .counter > .count {
    text-align: center;
    width: 50px;
  }

  figure,
  h1 {
    text-align: center;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }
</style>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Great success!</h1>
<figure>
  <img alt="Borat" src="great-success.png" />
</figure>

<a href="/dogs" rel="prefetch">
  Go To Dogs
</a>

<Adder title="My Adder" />

<div class="counter">
  <button on:click={() => counter.decrement()}>-</button>
  <div class="count">{$counter}</div>
  <button on:click={() => counter.increment()}>+</button>
  <button on:click={() => counter.reset()}>Reset</button>
</div>