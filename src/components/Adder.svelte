<!-- Only routes can use preload functions,
     so this is never invoked. -->
<script context="module">
  export async function preload() {
    console.log('Adder.svelte preload: entered');
  }
</script>
<!--script lang="typescript"-->
<script>
  import {onMount} from 'svelte';

  //TODO: export seems to not be supported when using TypeScript.
  //export const title: string = 'untitled';
  export let title = 'untitled';

  /*
  let n1: number = 0;
  let n2: number = 0;
  let sum: number;
  */
  let n1 = 0;
  let n2 = 0;
  let sum;

  $: sum = n1 + n2;

  onMount(() => {
    console.log('Adder.svelte onMount: entered');
  })
</script>

<style>
  .adder {
    border: solid blue 3px;
    font-size: 24px;
    padding: 20px;
  }

  input {
    border: solid gray 1px;
    border-radius: 10px;
    padding: 10px;
  }
</style>

<div class="adder">
  <span>{title}</span>
  <input type="number" bind:value={n1} />
  <label>+</label>
  <input type="number" bind:value={n2} />
  <label>=</label>
  <span>{sum}</span>
</div>