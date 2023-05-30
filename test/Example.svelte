<script>
	import Grid from "../src/grid.svelte";
	import {_} from "../src/plugins.js";
	import MockComponent from './MockComponent.svelte'
	
	const columns = [
		'Name',
		{
			name: 'Email',
			formatter: (cell) => _({component : MockComponent, props : {cell}, events : [{event : 'myevent', callback : () => {console.log('hello')}}]})
		}
	]

	const data = [
		{ name: "John", email: "john@example.com" },
		{ name: "Mark", email: "mark@gmail.com" },
	];
</script>

<Grid {data} {columns} />