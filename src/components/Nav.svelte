<script>
  export let segment;

  const getClass = (currSeg, thisSeg) =>
    currSeg === thisSeg ? 'selected' : '';
</script>

<style>
  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  li {
    display: block;
    float: left;
  }

  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    height: var(--nav-height);
    padding: 0 1em;
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

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={getClass(segment)} href="main">Home</a>
    </li>
    <li>
      <a class={getClass(segment, 'dogs')} href="main/dogs">Dogs</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a rel="prefetch" class={getClass(segment, 'blog')} href="main/blog">
        Blog
      </a>
    </li>
    <li>
      <a href=".">Logout</a>
    </li>
  </ul>
</nav>
