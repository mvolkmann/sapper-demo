<script>
  import {fade} from 'svelte/transition';

  let show = true;
  let props = {'transition:fade': {}};

  function toggle() {
    show = !show;
  }
</script>

<style>
.item {
  border: solid red 3px;
  padding: 1rem;
}
</style>

<h1>Animation Demos</h1>

<button on:click={toggle}>Toggle</button>

{#if show}
  <div class="item" {...props}>Look at me!</div>
{/if}