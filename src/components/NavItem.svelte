<script>
  export let href = undefined; // not required
  export let name;
  export let rel = undefined; // not required
  export let segment;

  const capitalize = text =>
    text
      .split(' ')
      .map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
      .join(' ');
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
  <a {rel} class={segment === name ? 'selected' : ''} href={href || 'main/' + name}>
    {capitalize(name)}
  </a>
</li>
