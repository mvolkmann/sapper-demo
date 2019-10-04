<svelte:head>
	<title>About</title>
</svelte:head>

<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch('dogs.json');
      let dogs = await res.json();
      // Properties in object returned are passed to this component as props.
      return res.ok ? {dogs} : {error: dogs.error};
    } catch (e) {
      console.error('about.svelte preload: e =', e);
      return {error: e.message};
    }
  }
</script>

<script>
   // The preload function passes these props.
   export let dogs;
   export let error;
</script>

<h1>Dogs</h1>

{#if error}
  <div class="error">Error: {error}</div>
{:else}
  {#each dogs as dog}
    <div>{dog.name} is a {dog.breed}.</div>
  {/each}
{/if}