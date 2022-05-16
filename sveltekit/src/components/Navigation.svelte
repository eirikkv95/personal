<script>
  import { onMount } from 'svelte';

  let show = false;
  let lastScroll = 0;

  onMount(() => {
    window.onscroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 50) return;

      if (currentScroll > lastScroll && currentScroll > 50) {
        show = true;
        lastScroll = currentScroll;
      } else if (currentScroll < lastScroll) {
        show = false;
        lastScroll = currentScroll;
      }
    };
  });
</script>

<div class="header" class:scrolled={show}>
  <nav class="maxWidthWrapper">
    <a href="/" class="noLink">Eirik Kalvø Vattøy</a>
    <ul>
      <li>
        <a href="/posts">Posts</a>
      </li>
      <li>
        <a href="/faq">Faq</a>
      </li>
    </ul>
  </nav>
</div>

<style>
  .header {
    position: fixed;
    width: 100%;
    align-items: center;
    height: fit-content;
    width: 100%;
    background: linear-gradient(0deg, #473f57, #473f57), #c4c4c4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease;
    z-index: 3;
  }
  .scrolled {
    transform: translate(0, -110%);
  }
  nav {
    display: flex;
    gap: 4rem;
  }
  ul {
    display: flex;
    align-items: center;
    padding-left: 0;
    gap: 2rem;
  }
  li {
    list-style-type: none;
  }
  li:last-child {
    margin-right: 2rem;
  }
  a {
    font-size: 1.4em;
    color: rgb(249, 249, 249);
    text-decoration: none;
  }
  a.noLink {
    --bg-size: 200%;
    --color-one: hsl(0, 90%, 55%);
    --color-two: hsl(216, 49%, 43%);

    font-size: clamp(1.6rem, 2rem, 2.5rem);
    background: linear-gradient(90deg, var(--color-one), var(--color-two), var(--color-one)) 0 0 /
      var(--bg-size) 100%;
    animation: move-bg 4s infinite linear;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
</style>
