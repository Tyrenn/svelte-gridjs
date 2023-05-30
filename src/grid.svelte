<script >
import { onMount, createEventDispatcher, onDestroy, tick } from "svelte";
import { Grid } from "gridjs";

export let width = "100%";
export let height = "auto";
export let autoWidth = true;
export let fixedHeader = false;
export let resizable = false;
export let from = undefined;
export let language = undefined;
export let search = false;
export let sort = false;
export let pagination = false;
export let server = undefined;
export let columns = undefined;
export let data = undefined;
export let plugins = undefined;
export let style = {};
export let className = {};

// https://github.com/grid-js/gridjs/blob/master/src/config.ts
export const instance = new Grid({
	from,
	data,
	columns,
	server,
	search,
	sort,
	pagination : pagination?.server?.url ? 
		{...pagination, server : { url : (prev, page, limit) => { dispatch('pagechange', {page, limit}); return pagination.server.url(prev, page, limit)}}} 
		: 
		pagination,
	language,
	width,
	height,
	autoWidth,
	plugins,
	fixedHeader,
	resizable,
	style,
	className,
});

export function triggerSearch(keyword){
	searchNode.value = keyword;
	let event = new Event('input', {
		bubbles: true,
		cancelable: true,
	});

	searchNode.dispatchEvent(event);
}

let node;
let searchNode;
let initiated = false;
const dispatch = createEventDispatcher();

// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts
instance.on("cellClick", (...args) => dispatch("cellClick", { ...args }));
instance.on("rowClick", (...args) => dispatch("rowClick", { ...args }));
// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts
instance.on("beforeLoad", () => dispatch("beforeLoad"));
instance.on("load", data => dispatch("load", { ...data }));
instance.on("ready", () => dispatch("ready"));

$: if (node) {
	if(initiated){
		// instance.config.plugin.remove("pagination");
		// instance.config.plugin.remove("search");
		instance
			.updateConfig({
			from,
			data,
			columns,
			server,
			search,
			sort,
			pagination,
			language,
			width,
			height,
			autoWidth,
			fixedHeader,
			style,
			className,
			resizable,
		}).forceRender();
	}
	else{
		instance.render(node);
		initiated = true;
	}
}

onMount(async () => {

	await tick();

	searchNode = document.querySelector('.gridjs-search-input');
});

onDestroy(() => {
	if(instance && instance.config && instance.config.container){
		instance.destroy();
	}
});

</script>

<article bind:this={node} />
