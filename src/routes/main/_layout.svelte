<script>
  import Nav from '../../components/Nav.svelte';

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

<Nav {segment} />

<main>
  <section>
    <slot />
  </section>
</main>
