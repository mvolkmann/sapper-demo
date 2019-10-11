<script>
  export let className = '';
  export let label = '';
</script>

<style lang="scss">
  /* VS Code complains about this, but it works in Svelte. */
  $color: green;

  .container {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }

  label {
    color: $color;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
</style>

<div class={'container ' + className}>
  <!-- Giving this a class allows it to be styled from outside. -->
  <label class="label">{label}</label>
  <slot />
</div>
