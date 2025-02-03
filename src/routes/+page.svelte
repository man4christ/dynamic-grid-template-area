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
		<div style="grid-area: one;" class="header w-full items-center bg-red-50 text-center">
			<div class="flex h-full items-center justify-center">1</div>
		</div>
		<div style="grid-area: two;" class="header w-full items-center bg-red-200 text-center">
			<div class="flex h-full items-center justify-center">2</div>
		</div>
		<div style="grid-area: three;" class="header w-full items-center bg-red-400 text-center">
			<div class="flex h-full items-center justify-center">3</div>
		</div>
		<div style="grid-area: four;" class="header w-full items-center bg-red-600 text-center">
			<div class="flex h-full items-center justify-center">4</div>
		</div>
		<div style="grid-area: five;" class="header w-full items-center bg-red-800 text-center">
			<div class="flex h-full items-center justify-center">5</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(3, 2);
		grid-template-areas:
			'a a a a a a a a b b b b c c d d i i i i i i i i j j j j k k l l '
			'a a a a a a a a e e e e e e e e i i i i i i i i m m m m m m m m '
			'f f f f f f f f f f f f f f f f n n n n n n n n n n n n n n n n '
			'g g g g g g g g h h h h h h h h o o o o o o o o p p p p p p p p ';
	}
</style>
