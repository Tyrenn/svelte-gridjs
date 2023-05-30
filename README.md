# Grid.js for Svelte

Svelte component for [Grid.js](https://gridjs.io/). Highly inspired by abandoned library [gridjs-svelte](https://github.com/iamyuu/gridjs-svelte) and library [gridjs-react](https://github.com/grid-js/gridjs-react)

## Install

```bash
npm install --save svelte-gridjs
```

Also, make sure you have Grid.js installed already as it's a peer dependency of `gridjs-svelte`:

```bash
npm install --save gridjs
```

## Usage

Import the Grid component first

```js
import Grid from "../src/grid.svelte";
```

```jsx
<Grid
  data={[
		{ name: "John", email: "john@example.com" },
		{ name: "Mark", email: "mark@gmail.com" }
	]}
  columns={['Name', 'Email']}
  search
  pagination={{
    enabled: true,
    limit: 1,
  }}
/>
```

Then you can pass all Grid.js configs to the `Grid` component. See [Grid.js Config](https://gridjs.io/docs/config) for more details.

## Svelte component in cells

You can bind your svelte components in Table cells (both in header and body cells) :
The composer function `_` allows you to pass a svelte component, props and events with listeners to attach to it. It is fully functionnal with svelte reactivity. Component will unmount properly.

```js
import {_} from "svelte-gridjs";
import MockComponent from "./MockComponent.svelte";
```

```jsx
<Grid
  data={[
		{ name: "John", email: "john@example.com" },
		{ name: "Mark", email: "mark@gmail.com" }
	]}
  columns={[
		'Name', 
		{
			name: 'Email',
			formatter: (cell) => _({component : MockComponent, props : {cell}, events : [{event : 'myevent', callback : () => {console.log('hello')}}]})
		}
	]}
  search
  pagination={{
    enabled: true,
    limit: 1,
  }}
/>
```


## Example

See the [Svelte example](./test/Example.svelte).

## License

MIT