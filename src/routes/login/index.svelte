<script>
  import { onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import LabeledInput from '../../components/LabeledInput.svelte';

  let password = 'secret';
  let username = 'mark';
  let usernameInput;

  onMount(() => {
    console.log('index.svelte onMount: usernameInput =', usernameInput);
    //TODO: Why isn't this working?
    usernameInput.focus();
  });

  function login() {
    //TODO: Verify username and password.
    sapper.goto('main');
  }
</script>

<style>
  button {
    margin-top: 1rem;
    width: unset;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    border-right: solid black 3px;
    object-fit: contain;
  }

  .login {
    background-color: cornflowerblue;
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  .login > * {
    width: 50%;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white;
    padding: 1rem;
  }

  @media (max-width: 650px) {
    img {
      display: none;
    }

    .right {
      width: 100% !important;
    }
  }
</style>

<div class="login">
  <img alt="Borat" src="svelte-vertical.png" />
  <div class="right">
    <h1>Login</h1>
    <form>
      <LabeledInput bind:inputRef={usernameInput} label="Username" bind:value={username} />
      <LabeledInput label="Password" type="password" bind:value={password} />
      <button disabled={!username || !password} on:click|preventDefault={login}>
        Login
      </button>
    </form>
  </div>
</div>