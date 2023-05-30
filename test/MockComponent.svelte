<script>
	// 	FIXME: cell not receive the data this probably bug on Grid.js
	// https://github.com/grid-js/gridjs/issues/904
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher();

	export let cell;
	
	let test = false;
	// export let row;
</script>

{#if test}
	<input type="text" bind:value={cell} on:change={() => dispatch('myevent')}/>
{:else}
	<div on:click={() => test = true} on:keypress>{cell}</div>
{/if}