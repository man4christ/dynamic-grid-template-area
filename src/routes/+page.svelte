<script lang="ts">
	import { onMount } from 'svelte';

	interface Pane {
		colspanWrapper: string;
		colspan: string;
		gridspan: string;
		hidden: string;
		next: any;
		split: string;
		name: string;
        bg: string;
	}

	function getRootPane(): any {
		let pane = $state({
			name: 'root',
			colspanWrapper: 'col-span-2',
			span: 'col-span-2',
			gridspan: 'grid-cols-2',
			hidden: '',
            bg: 'bg-red-50'
		});
		return pane;
	}

	let rootPane: any = $state();
	onMount(() => {
		rootPane = getRootPane();
		let p = $state({
			colspanWrapper: 'col-span-1',
			colspan: 'col-span-2',
			gridspan: 'grid-cols-2',
			hidden: '',
            bg: 'bg-red-200',
            name:'pane1'
		});
        rootPane.next = p
	});
</script>

{#snippet pane(pane1: Pane)}
	{#if pane1}
		<div class=" h-[100%] w-[100%] {pane1.colspanWrapper}">
			<div class="grid h-[100%] w-[100%] {pane1.gridspan}">
				<div class="{pane1.bg} {pane1.colspan} {pane1.hidden} ">{pane1.name}</div>
				{@render pane(pane1.next)}
			</div>
		</div>
	{/if}
{/snippet}

<div class="flex h-[100vh] w-full">
	{#if rootPane}
		{@render pane(rootPane)}
	{/if}
</div>
