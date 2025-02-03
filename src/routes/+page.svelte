<script lang="ts">
	import { numberToLetters, renderGridTemplateAreas, type node } from '$lib/dynamicGrid';
	import { onMount } from 'svelte';
	import Component from './component.svelte';
	import { paneService } from '$lib/pane.service.svelte';

	let toggle = $state(true);

	let template = $state();

	let elements = $state([]);
	let deletedElements = $state({});

	function onGridUpdate() {
		let gta = renderGridTemplateAreas(paneService.rootPane);

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
		let n = findNodes(paneService.rootPane, paneId);

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
					id: n.id,
					buffer: n.buffer
				},
				right: {
					id: nid,
					buffer: Component
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
				id: nid,
				buffer: Component
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
            let tmp = n.right.id
			deletedElements[n.right.id] = n.right.id;
			//do delete this is the parent
			if (n.left.split) {
				n.split = n.left.split;
                n.right = n.left.right;
				n.left = n.left.left;
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

    let root = $state()
	onMount(() => {
        root = paneService.rootPane
		paneService.rootPane.buffer = Component;
		paneService.onDeletePane = deletePane;
		paneService.onSplitPane = splitPane;
		onGridUpdate();
	});

	let hidden = $state(false);
</script>
{JSON.stringify(root)}
<div class="flex h-[100vh] w-full flex-col">
	<div style="min-width: 1px; {template}" class="h-[100%] w-full">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		{#each elements as a, idx}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			{#if !deletedElements[a]}
				{@const pane = findNodes(paneService.rootPane, a)}
				{@const Component = pane?.buffer}
				<div
					style="grid-area: {a};"
					class="header w-full items-center border border-neutral-200 bg-neutral-950 text-center"
				>
					<Component paneId={a}></Component>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
</style>
