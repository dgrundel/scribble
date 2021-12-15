<script lang="ts">
	export let name: string;
	let count = 0;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>Clicks: {count}</p>
	<button on:click={() => { count += 1; }}>Click this</button>

	<pre>
		Here's a code block (sort of!)
	</pre>
</main>