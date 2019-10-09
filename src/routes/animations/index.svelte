<script>
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
</div>
<!-- Example from somewhere else follows:
<script>
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let uid = 1;

	let todos = [
		{ id: uid++, done: false, description: 'write some docs' },
		{ id: uid++, done: false, description: 'start writing blog post' },
		{ id: uid++, done: true,  description: 'buy some milk' },
		{ id: uid++, done: false, description: 'mow the lawn' },
		{ id: uid++, done: false, description: 'feed the turtle' },
		{ id: uid++, done: false, description: 'fix some bugs' },
	];

	function add(input) {
		const todo = {
			id: uid++,
			done: false,
			description: input.value
		};

		todos = [todo, ...todos];
		input.value = '';
	}

	function remove(todo) {
		todos = todos.filter(t => t !== todo);
	}

	function mark(todo, done) {
		todo.done = done;
		remove(todo);
		todos = todos.concat(todo);
	}
</script>

<div class='board'>
	<input
		placeholder="what needs to be done?"
		on:keydown={e => e.which === 13 && add(e.target)}
	>

	<div class='left'>
		<h2>todo</h2>
		{#each todos.filter(t => !t.done) as todo (todo.id)}
			<label>
				<input type=checkbox on:change={() => mark(todo, true)}>
				{todo.description}
				<button on:click="{() => remove(todo)}">remove</button>
			</label>
		{/each}
	</div>

	<div class='right'>
		<h2>done</h2>
		{#each todos.filter(t => t.done) as todo (todo.id)}
			<label class="done">
				<input type=checkbox checked on:change={() => mark(todo, false)}>
				{todo.description}
				<button on:click="{() => remove(todo)}">remove</button>
			</label>
		{/each}
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1em;
		max-width: 36em;
		margin: 0 auto;
	}

	.board > input {
		font-size: 1.4em;
		grid-column: 1/3;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
		margin: 0 0 0.5em 0;
	}

	label {
		position: relative;
		line-height: 1.2;
		padding: 0.5em 2.5em 0.5em 2em;
		margin: 0 0 0.5em 0;
		border-radius: 2px;
		user-select: none;
		border: 1px solid hsl(240, 8%, 70%);
		background-color:hsl(240, 8%, 93%);
		color: #333;
	}

	input[type="checkbox"] {
		position: absolute;
		left: 0.5em;
		top: 0.6em;
		margin: 0;
	}

	.done {
		border: 1px solid hsl(240, 8%, 90%);
		background-color:hsl(240, 8%, 98%);
	}

	button {
		position: absolute;
		top: 0;
		right: 0.2em;
		width: 2em;
		height: 100%;
		background: no-repeat 50% 50% url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
		background-size: 1.4em 1.4em;
		border: none;
		opacity: 0;
		transition: opacity 0.2s;
		text-indent: -9999px;
		cursor: pointer;
	}

	label:hover button {
		opacity: 1;
	}
</style-->