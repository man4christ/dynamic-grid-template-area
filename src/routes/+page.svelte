<script lang="ts">
	import { numberToLetters, renderGridTemplateAreas, type node } from '$lib/dynamicGrid';
	import { onMount } from 'svelte';

	let toggle = $state(true);

	let template = $state();

	let root: any = $state({
		id: 'a',
		split: undefined,
		left: undefined,
		right: undefined
	});

	let elements = $state([]);
	let deletedElements = $state({});

	function onGridUpdate() {
		let gta = renderGridTemplateAreas(root);

		let els = {};
		let grid = '';

		for (let i = 0; i < gta.length; i++) {
			let s = '';
			for (let j = 0; j < gta[i].length; j++) {
				s += `${gta[i][j]} `;
				els[gta[i][j]] = gta[i][j];
			}
			grid += '"' + s + '"\n';
		}

		elements = Object.keys(els)
			.concat(Object.keys(deletedElements))
			.sort((a: string, b: string) => {
				let aval = 0,
					bval = 0;

				for (let i = 0; i < a.length; i++) {
					aval += a.charCodeAt(i) - 96;
				}
				for (let i = 0; i < b.length; i++) {
					bval += b.charCodeAt(i) - 96;
				}
				return aval - bval;
			});

		template = `display: grid;
        grid-template-columns: repeat(${gta.length}, ${gta[0].length});
		grid-template-areas:
			${grid};`;
	}

	function flattenNodes(n: node): node[] {
		let ln: node[] = [];
		if (n.left) {
			ln = flattenNodes(n.left);
		}

		let rn: node[] = [];
		if (n.right) {
			rn = flattenNodes(n.right);
		}

		if (n.left === undefined && n.right === undefined) {
			return [n];
		}

		return ln.concat(rn);
	}

	function findNodes(n: node, key: string): node | undefined {
		if (n.id === key) {
			return n;
		}
		let found;

		if (n.left) {
			found = findNodes(n.left, key);
		}

		if (found) {
			return found;
		}

		if (n.right) {
			found = findNodes(n.right, key);
		}

		return found;
	}

	function splitPane(paneId: string, split: string) {
		let n = findNodes(root, paneId);

		/**n should never be undefined */
		if (!n) {
			return;
		}

		let lid: string = elements[elements.length - 1];
		let val = 0;
		for (let i = 0; i < lid.length; i++) {
			val += lid.charCodeAt(i) - 96;
		}

		let nid = numberToLetters(val + 1);
		if (n.left && n.right) {
			n.left = {
				split: n.split,
				left: {
					id: n.id
				},
				right: {
					id: nid
				}
			};
			n.id = undefined;
			n.split = split;
		} else {
			n.split = split;

			n.left = {
				id: n.id
			};

			n.right = {
				id: nid
			};
			n.id = undefined;
		}
		onGridUpdate();
	}

	function deletePane(n: node, key: string) {
		if (n.id === key) {
			return n;
		}
		let found;

		if (n.left) {
			found = deletePane(n.left, key);
		}

		if (found) {
			deletedElements[n.left.id] = n.left.id;
			//do delete. this is the parent
			if (n.right.split) {
				n.split = n.right.split;
				n.left = n.right.left;
				n.right = n.right.right;
			} else {
				n.id = n.right.id;
				n.split = undefined;
				n.left = undefined;
				n.right = undefined;
			}

			onGridUpdate();
			return;
		}

		if (n.right) {
			found = deletePane(n.right, key);
		}

		if (found) {
			deletedElements[n.right.id] = n.right.id;
			//do delete this is the parent
			if (n.left.split) {
				n.split = n.left.split;
				n.left = n.left.left;
				n.right = n.left.right;
			} else {
				n.id = n.left.id;
				n.split = undefined;
				n.left = undefined;
				n.right = undefined;
			}

			onGridUpdate();
			return;
		}
	}

	onMount(() => {
		onGridUpdate();
	});
	let hidden = $state(false);
</script>

<div class="flex h-[100vh] w-full flex-col">
	{JSON.stringify(root)}
	{JSON.stringify(deletedElements)}
	<div style="min-width: 1px; {template}" class="h-[100%] w-full">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		{#each elements as a, idx}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			{#if !deletedElements[a]}
				<div
					style="grid-area: {a};"
					class="header w-full items-center border border-neutral-200 bg-neutral-950 text-center {deletedElements[
						a
					]
						? 'hidden'
						: ''}"
				>
					<div class="flex h-full flex-col items-center justify-center text-neutral-200">
						{a}
						{new Date().getSeconds()}
						<br />
						<button
							class="bg-green-500 text-neutral-700"
							onclick={() => {
								splitPane(a, 'v');
							}}>Vertical Split</button
						>
						<button
							class="bg-green-500 text-neutral-700"
							onclick={() => {
								splitPane(a, 'h');
							}}>Horizontal</button
						>

						<button
							class="bg-green-500 text-neutral-700"
							onclick={() => {
								console.log('root', root);
								deletePane(root, a);
							}}>Delete</button
						>
					</div>
				</div>
			{/if}
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
