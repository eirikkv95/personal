<script context="module">
	import client from '$lib/client';

	export async function load() {
		const query = `*[_type == "post"]{title,slug}`;
		const posts = await client.fetch(query);

		return {
			props: { posts }
		};
	}
</script>

<script>
	export let posts;
</script>

{#each posts as post}
	<li>
		<a href={`posts/${post.slug.current}`}>{post.title}</a>
	</li>
{/each}

<style>
	a {
		color: white;
	}
</style>
