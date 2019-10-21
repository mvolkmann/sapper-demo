<script>
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  export let main = false; // wanted to name this "default", but that's a keyword
  export let href = undefined;
  export let name; // required
  export let rel = undefined;
  export let segment; // required

  const capitalize = text =>
    text
      .split(' ')
      .map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
      .join(' ');

  const getClass = segment =>
    main ? (segment ? '' : 'selected') : segment === name ? 'selected' : '';

  const handleClick = () => dispatch('click');
</script>

<style>
  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  a:hover {
    color: green;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }
</style>

<li>
  <a {rel} class={getClass(segment)} href={href || name} on:click={handleClick}>
    {capitalize(name)}
  </a>
</li>
