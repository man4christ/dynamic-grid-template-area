<script lang="ts">
	import { paneService } from "$lib/pane.service.svelte";

	let { paneId } = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center bg-neutral-900 text-neutral-200">
	{paneId}
	{new Date().getSeconds()}
	<button
		class="bg-green-700 text-neutral-700 p-1 m-1"
		onclick={() => {
		paneService.onSplitPane(paneId, 'v');
		}}>Vertical Split</button
	>
	<button
		class="bg-green-700 text-neutral-700 p-1 m-1"
		onclick={() => {
			paneService.onSplitPane(paneId, 'h');
		}}>Horizontal</button
	>

	<button
		class="bg-green-700 text-neutral-700 p-1 m-1"
		onclick={() => {
			paneService.onDeletePane(paneService.rootPane, paneId);
		}}>Delete</button
	>

	Hi im a component
</div>
