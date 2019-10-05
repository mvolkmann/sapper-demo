<script context="module">
  export async function preload() {
    try {
      // Use this.fetch only in module context?
      const res = await this.fetch('main/dogs.json');
      const result = await res.json();

      // Properties in the object returned are passed to this component as props.
      if (res.ok) {
        const dogMap = result.reduce((acc, dog) => {
          acc[dog._id] = dog;
          return acc;
        }, {});
        return {dogMap};
      } else {
        return {error: result.error};
      }
    } catch (e) {
      return {error: e.message};
    }
  }
</script>

<script>
  // The preload function passes these props.
  export let dogMap = {};
  export let error = null;

  let breed = '';
  let breedInput;
  let id = '';
  let name = '';

  $: saveBtnText = id ? 'Modify' : 'Add';

  $: sortedDogs = Object.values(dogMap).sort((dog1, dog2) =>
    dog1.name.localeCompare(dog2.name)
  );
  // $: console.log('dogMap =', dogMap);
  // $: console.log('id =', id);
  // $: console.log('sortedDogs =', sortedDogs);

  function clearState() {
    id = breed = name = '';
    breedInput.focus();
  }

  async function deleteDog(id) {
    console.log('about.svelte deleteDog: id =', id);
    try {
      const options = {method: 'DELETE'};
      const res = await fetch(`main/dogs/${id}.json`, options);
      if (!res.ok) throw new Error('failed to delete dog with id ' + id);
      delete dogMap[id];
      dogMap = dogMap;
      clearState();
    } catch (e) {
      error = e.message;
    }
  }

  function editDog(dog) {
    ({breed, name} = dog);
    id = dog._id;
  }

  // This handles both creating and updating dogs.
  async function saveDog() {
    // If `id` is set, we are updating a dog.
    // Otherwise we are adding a new dog.
    const dog = {breed, name};
    if (id) dog._id = id;

    try {
      const options = {
        method: id ? 'PUT' : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dog)
      };
      // Use this.fetch only in module context.
      //const path = 'dogs' + (id ? '/' + id : '') + '.json';
      const path = id ? `dogs/${id}.json` : 'dogs.json';
      console.log('index.svelte saveDog: id =', id);
      const res = await fetch('main/' + path, options);
      let result = await res.json();
      console.log('index.svelte saveDog: result =', result);

      if (!res.ok) throw new Error(result.error);

      dogMap[result._id] = result;
      dogMap = dogMap;
      clearState();
    } catch (e) {
      error = e.message;
    }
  }
</script>

<style>
  .borderless {
    background-color: transparent;
    font-size: 18px;
    margin-left: 0.5rem;
  }
  .borderless:hover {
    background-color: lightgreen;
  }

  .dog-row {
    display: flex;
    align-items: center;
  }

  form {
    margin-top: 1rem;
  }

  form > div {
    margin-bottom: 0.5rem;
  }

  input {
    width: 200px;
  }

  label {
    margin-right: 0.5rem;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>Dogs</h1>

{#if error}
  <div class="error">Error: {error}</div>
{:else}
  {#each sortedDogs as dog}
    <div class="dog-row">
      {dog.name} is a {dog.breed}.
      <button class="borderless" on:click={() => editDog(dog)}>&#x270E;</button>
      <button class="borderless" on:click={() => deleteDog(dog._id)}>
        &#x1F5D1;
      </button>
    </div>
  {/each}
{/if}

<form>
  <div>
    <label>Breed</label>
    <input bind:this={breedInput} bind:value={breed} />
  </div>
  <div>
    <label>Name</label>
    <input bind:value={name} />
  </div>

  <button disabled={!breed || !name} on:click|preventDefault={saveDog}>
    {saveBtnText}
  </button>

  {#if id}
    <button on:click|preventDefault={clearState}>Cancel</button>
  {/if}
</form>
