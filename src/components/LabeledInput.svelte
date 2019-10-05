<script>
  import LabeledChildren from './LabeledChildren.svelte';

  export let inputRef = null;
  export let label = '';
  export let type = 'text';
  export let value = '';

  const onChange = event => (value = event.target.value);
</script>

<LabeledChildren {label}>
  <input bind:this={inputRef} {type} {value} on:input={onChange} />
</LabeledChildren>
