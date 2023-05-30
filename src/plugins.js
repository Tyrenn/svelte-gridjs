import { h, createRef as gCreateRef, Component as gComponent } from "gridjs";

export class SvelteWrapper extends gComponent {
	constructor() {
		super(...arguments);
		this.ref = gCreateRef();
		this.instance = null;
	}

	componentDidMount() {
		const { component: Component, parentElement: _parentElement, parentProps: _parentProps, plugin: _plugin, props, events } = this.props;
		this.instance = new Component({ target: this.ref.current, props });
		if(events && Array.isArray(events))
			for(let e of events)
				this.instance.$on(e.event, e.callback);
	}

	componentDidUpdate() {
		this.instance.$set(this.props);
	}

	componentWillUnmount() {
		this.instance.$destroy();
	}

	render() {
		return h(this.props.parentElement, { ...this.props.parentProps, ref: this.ref });
	}
}

export function _(component, parent){
	return h(SvelteWrapper, {
		component: component.component,
		props : component?.props ?? {},
		events : component.events,
		parentElement: parent?.element ?? "div",
		parentProps: parent?.props ?? {},
	});
}
