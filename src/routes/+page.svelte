<script lang="ts">
	import { onMount } from 'svelte';


	onMount(() => {
		template = `display: grid;
        grid-template-columns: repeat(8, 16);
		grid-template-areas:
			'a a a a a a a a b b b b c c d d '
			'a a a a a a a a e e e e e e e e '
			'f f f f f f f f f f f f f f f f '
			'g g g g g g g g h h h h h h h h '
			'i i i i i i i i j j j j k k l l '
			'i i i i i i i i m m m m m m m m '
			'n n n n n n n n n n n n n n n n '
			'o o o o o o o o p p p p p p p p ';`;

		template2 = `display: grid;
        grid-template-columns: repeat(4, 32);
        grid-template-areas:
			'a a a a a a a a b b b b c c d d i i i i i i i i j j j j k k l l'
			'a a a a a a a a e e e e e e e e i i i i i i i i m m m m m m m m'
			'f f f f f f f f f f f f f f f f n n n n n n n n n n n n n n n n'
			'g g g g g g g g h h h h h h h h o o o o o o o o p p p p p p p p';`;
	});

	let toggle = $state(true);

	let template = $state();
	let template2 = $state();
</script>

<div class="flex h-[100vh] w-full flex-col">
	<button
		onclick={() => {
			toggle = !toggle;
		}}
	>
		Toggle</button
	>
	<div style="min-width: 1px; {toggle ? template : template2}" class="h-[100%] w-full">
		{#each Array(16) as a, idx}
			<div
				style="grid-area: {String.fromCharCode(97 + idx)};"
				class="header w-full items-center border border-neutral-200 bg-neutral-950 text-center"
			>
				<div class="flex h-full items-center justify-center text-neutral-200">
					{String.fromCharCode(97 + idx)} {new Date().getSeconds()}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(8, 16);
		grid-template-areas:
			'a a a a a a a a b b b b c c d d i i i i i i i i j j j j k k l l '
			'a a a a a a a a e e e e e e e e i i i i i i i i m m m m m m m m '
			'f f f f f f f f f f f f f f f f n n n n n n n n n n n n n n n n '
			'g g g g g g g g h h h h h h h h o o o o o o o o p p p p p p p p ';
	}
</style>
