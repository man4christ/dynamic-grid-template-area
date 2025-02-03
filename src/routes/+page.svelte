<script lang="ts">
	import { renderGridTemplateAreas } from '$lib/dynamicGrid';
	import { onMount } from 'svelte';

	let toggle = $state(true);

	let template = $state();
	let template2 = $state();

	let root = $state({
		id: 'root',
        split: undefined
	});

	let elements = $state([]);
	function onGridUpdate() {
		let gta = renderGridTemplateAreas(root);
        console.log(gta)

		let els = {};
		let grid = '';

		for (let i = 0; i < gta.length; i++) {
			let s = '';
			for (let j = 0; j < gta[i].length; j++) {
				s += `${gta[i][j]} `;
				els[s] = s;
			}
			grid += '"' + s + '"\n';
		}

		elements = Object.keys(els).sort((a: string, b: string) => {
			return a.charCodeAt(0) - b.charCodeAt(0);
		});

		template = `display: grid;
        grid-template-columns: repeat(${gta.length}, ${gta[0].length});
		grid-template-areas:
			${grid};`;
	}



    function splitVertical(paneId: string) {

    }

	onMount(() => {
		onGridUpdate();
	});
    let hidden = $state(false)
</script>

<div class="flex h-[100vh] w-full flex-col">
	<button
		onclick={() => {
            hidden = !hidden
			toggle = !toggle;

		}}
	>
		Toggle</button
	>
	<div style="min-width: 1px; { template }" class="h-[100%] w-full">
		{#each elements as a, idx}
			<div
				style="grid-area: {a};"
				class="header w-full items-center border border-neutral-200 bg-neutral-950 text-center"
			>
				<div class="flex h-full items-center justify-center text-neutral-200">
					{a}
					{new Date().getSeconds()}
				</div>
			</div>
		{/each}
        <div style="grid-area: 0;" class='{hidden ? 'hidden': ''}'>hello</div>
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
