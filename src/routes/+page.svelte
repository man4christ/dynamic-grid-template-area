<script lang="ts">
	import { renderGridTemplateAreas, type node } from '$lib/dynamicGrid';
	import { onMount } from 'svelte';

	let toggle = $state(true);

	let template = $state();

	let root: any = {
		id: 'root',
		split: undefined,
		left: undefined,
		right: undefined
	};

	let elements = $state([]);

	function onGridUpdate() {
		let gta = renderGridTemplateAreas(root);
		console.log(gta);

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

		elements = Object.keys(els).sort((a: string, b: string) => {
			return a.charCodeAt(0) - b.charCodeAt(0);
		});

		console.log(elements);

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

        if (found){
            return found
        }
        
		if (n.right) {
			found = findNodes(n.right, key);
		}

		return found;
	}

	function splitVertical(paneId: string) {
		let n = findNodes(root, paneId);

		/**n should never be undefined */
		if (!n) {
            console.log('did not find ' , paneId, root)

			return;
		}

		let lid: string = elements[elements.length - 1];
		let nid = '';
		// TODO fix this. will need to update tests
		if (nid === 'root') {
			nid = 'a';
		} else {
			nid = String.fromCharCode(lid.charCodeAt(0) + 1);
		}

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

			n.split = 'v';
		} else {
			n.split = 'v';
			n.left = {
				id: n.id
			};

			n.right = {
				id: nid
			};
		}
		console.log('node', n, root);
		onGridUpdate();
	}

	onMount(() => {
		onGridUpdate();
	});
	let hidden = $state(false);
</script>

<div class="flex h-[100vh] w-full flex-col">
	<button
		onclick={() => {
			splitVertical('root');
			toggle = !toggle;
		}}
	>
		Toggle</button
	>
	<div style="min-width: 1px; {template}" class="h-[100%] w-full">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		{#each elements as a, idx}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				style="grid-area: {a};"
				class="header w-full items-center border border-neutral-200 bg-neutral-950 text-center"
			>
				<div class="flex h-full items-center justify-center text-neutral-200">
					{a}
					{new Date().getSeconds()}
					<br />
					<button
						onclick={() => {
							splitVertical(a);
						}}>Vertical Split</button
					>
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
