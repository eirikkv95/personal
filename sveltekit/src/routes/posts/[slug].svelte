<script context="module">
  import client from '$lib/client';
  export async function load(page) {
    // use slug from params
    const slug = page.params.slug;
    const query = `*[_type == "post" && slug.current == "${slug}"]`;
    const posts = await client.fetch(query);
    return {
      props: { posts }
    };
  }
</script>

<script>
  export let posts;
</script>

<div>
  {#each posts as post}
    <h1>{post?.title}</h1>
    <p>hello</p>
  {/each}
</div>

<style>
  h1 {
    color: white;
  }
  p {
    --bg-size: 200%;
    --color-one: hsl(0, 90%, 55%);
    --color-two: hsl(216, 49%, 43%);

    font-size: clamp(2rem, 3rem, 4rem);
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
