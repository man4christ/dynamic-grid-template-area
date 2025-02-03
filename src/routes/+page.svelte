<script lang="ts">
	import { onMount } from 'svelte';

	interface node {
		id: string;
		next: node | any;
		split: string;
	}

	interface rootNode {
		left: node;
		right: node;
	}

	function add(n: node): any[] {
		if (n.next === undefined) {
			return [[n.id]];
		} else {
			let g = add(n.next);
			let row = g.length;
			let col = g[0].length;
			let ng = [];

			for (let i = 0; i < row; i++) {
				let r = [];
				for (let i = 0; i < col; i++) {
					r.push(n.id);
				}
				ng.push(r);
			}

			let com = [];
			if (n.split === 'v') {
				for (let i = 0; i < row; i++) {
					com.push(ng.concat(ng[i], g[i]));
				}
			}

			if (n.split === 'h') {
			}

			return ng;
		}
	}
	onMount(() => {
		let root: {
			id: 'root';
			left: {
				id: '1';
				split: 'v';
				next: {
					id: '4';
				};
			};
			right: {
				id: '2';
				split: 'h';
				next: {
					id: '3';
					split: 'v';
					next: {
						id: 5;
					};
				};
			};
		};
	});
</script>

<div class="flex h-[100vh] w-full">
	<div class="wrapper w-full">
		{#each Array(16) as a, idx}
			<div
				style="grid-area: {String.fromCharCode(97 + idx)};"
				class="header w-full items-center border border-red-900 bg-red-50 text-center"
			>
				<div class="flex h-full items-center justify-center">{String.fromCharCode(97 + idx)}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(8, 16);
		grid-template-areas:
			'a a a a a a a a b b b b c c d d '
			'a a a a a a a a e e e e e e e e '
			'f f f f f f f f f f f f f f f f '
			'g g g g g g g g h h h h h h h h '
			'i i i i i i i i j j j j k k l l '
			'i i i i i i i i m m m m m m m m '
			'n n n n n n n n n n n n n n n n '
			'o o o o o o o o p p p p p p p p ';
	}
</style>
