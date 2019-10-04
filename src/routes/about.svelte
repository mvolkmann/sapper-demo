<svelte:head>
	<title>About</title>
</svelte:head>

<script context="module">
  export async function preload(page, session) {
    try {
      // Use this.fetch only in module context?
      const res = await this.fetch('dogs.json');
      const dogs = await res.json();
      // Properties in object returned are passed to this component as props.
      return res.ok ? {dogs} : {error: dogs.error};
    } catch (e) {
      return {error: e.message};
    }
  }
</script>

<script>
  // The preload function passes these props.
  export let dogs;
  export let error = null;

  let breed = '';
  let name = '';

  async function addDog() {
    try {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({breed, name})
      };
      // Use this.fetch only in module context?
      const res = await fetch('dogs.json', options);
      let newDog = await res.json();
      if (res.ok) {
        dogs = [...dogs, newDog];
        breed = name = '';
      } else {
        error = newDog.error;
      }
    } catch (e) {
      error = e.message;
    }
  }

  async function deleteDog(id) {
    try {
      const options = {method: 'DELETE'};
      const res = await fetch('dogs.json?id=' + id, options);
      if (!res.ok) throw new Error('failed to delete dog with id ' + id);
      dogs = dogs.filter(dog => dog._id !== id);
    } catch (e) {
      error = e.message;
    }
  }
</script>

<style>
  .borderless {
    border: none;
  }

  button, input {
    border: solid lightgray 1px;
    border-radius: 4px;
    padding: 4px;
  }
</style>

<h1>Dogs</h1>

{#if error}
  <div class="error">Error: {error}</div>
{:else}
  {#each dogs as dog}
    <div>
      {dog.name} is a {dog.breed}.
      <button class="borderless" on:click={() => deleteDog(dog._id)}>
        &#x1F5D1;
      </button>
    </div>
  {/each}
{/if}

<form>
  <div>
    <label>Breed</label>
    <input bind:value={breed} />
  </div>
  <div>
    <label>Name</label>
    <input bind:value={name} />
  </div>

  <button disabled={!breed || !name} on:click={addDog}>Add</button>
</form>