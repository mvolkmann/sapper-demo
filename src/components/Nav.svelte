<script>
  import NavItem from './NavItem.svelte';
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    height: var(--nav-height);
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>

<nav>
  <ul>
    <NavItem main {segment} href="main" name="home" />
    <NavItem {segment} name="animations" />
    <NavItem {segment} name="dogs" />
    <!-- Using rel=prefetch so Sapper prefetches the blog data
         when we hover over the link or tap it on a touchscreen. -->
    <NavItem {segment} name="blog" rel="prefetch" />
    <NavItem {segment} href="." name="logout" />
  </ul>
</nav>
