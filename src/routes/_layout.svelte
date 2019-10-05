<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    display: flex;
    justify-content: center;

    background-color: white;
    box-sizing: border-box;
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
