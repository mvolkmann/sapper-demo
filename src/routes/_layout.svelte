<script>
  import {authenticated} from '../stores';
  import Nav from '../components/Nav.svelte';

  // This prop is automatically passed to all layouts.
  export let segment;
</script>

<style>
  main {
    display: flex;
    justify-content: center;

    background-color: linen;
    box-sizing: border-box;
    height: calc(100vh - var(--nav-height));
    padding: 2em;
    width: 100vw;
  }
</style>

{#if $authenticated}
  <Nav {segment} />

  <main>
    <section>
      <slot />
    </section>
  </main>
{:else}
  <slot />
{/if}
