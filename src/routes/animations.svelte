<script>
  import {onMount} from 'svelte';
  import {flip} from 'svelte/animate';
  import {blur, crossfade, draw, fade, fly, scale, slide} from 'svelte/transition';

  let showBlur = true;
  let showFade = true;
  let showFly = true;
  let showSlide = true;

  const options = {delay: 500, duration: 1500};

  // Does the "fly" transition only work with elements that have "position: absolute"?
  // Elements that use the fly transistion will not be visible before flying in
  // and will disappear after flying out,
  // so usually the default opacity value of zero is desired.
  // For in:fly, opacity is the starting opacity when it begins to appear.
  // For out:fly, opacity is the ending opacity before it disappears.
  const flyInStartOpacity = 0; //0.2;
  const flyOutEndOpacity = 0; //0.2;
  const flyInOptions = {duration: 2000, opacity: flyInStartOpacity, x: '100 px', y: '100 px'};
  const flyOutOptions = {duration: 2000, opacity: flyOutEndOpacity, x: '200 px', y: '200 px'};

  function toggle() {
    showBlur = !showBlur;
    showFade = !showFade;
    showFly = !showFly;
    showSlide = !showSlide;
  }

  let MyClientOnly;

  onMount(async () => {
    const module = await import('../components/MyClientOnly.svelte');
    MyClientOnly = module.default;
  });
</script>

<style>
  button {
    border: solid gray 1px;
    border-radius: 4px;
    font-size: 18px;
    padding: 1rem;
  }

  .container {
    outline: solid red 1px;
    height: 600px;
    width: 600px;
    /* position: relative; */
  }

  .fly {
    position: absolute;
    x: 100px;
    y: 100px;
  }

  .item {
    border: solid red 3px;
    font-size: 18px;
    margin-top: 1rem;
    padding: 1rem;
  }
</style>

<svelte:head>
  <title>Animations</title>
</svelte:head>

<div class="container">
  <h1>Animation Demos</h1>

  <!--label
    in:receive="{{key: todo.id}}"
    out:send="{{key: todo.id}}"
  	animate:flip="{{duration: 200}}"
  -->

  <button on:click={toggle}>Toggle All</button>

  <!-- {#if showBlur}
    <div class="item" transition:blur={options}>Blur Me!</div>
  {/if} -->

  <!-- {#if showFade}
    <div class="item" transition:fade={options}>Fade Me!</div>
  {/if} -->

  {#if showFly}
    <div class="fly item"
      in:fly={flyInOptions}
      out:fly={flyOutOptions}>
      Fly Me!
    </div>
  {/if}

  <!-- {#if showSlide}
    <div class="item" transition:slide={options}>Slide Me!</div>
  {/if} -->

  <!-- This renders a component that is discovered at run-time.
       Note how props can be passed to the component. -->
  <svelte:component this={MyClientOnly} someProp="someValue" />
</div>
