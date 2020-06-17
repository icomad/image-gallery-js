/* Inspired by ReactJS and based on ReefJS */
class Yogurt<T extends object> implements IYogurt<T> {
	/* The element selector to which the component will render	*/
	public elem: string;

	/* The string template of the component	*/
	public template: Template<T>;

	/* The component state */
	private _state: T;

	/* Track if component has already a render request */
	private efficiency: number;

	/* Component children of this component */
	private children = [] as YogChildren;

	constructor(options: Options<T>) {
		this.elem = options.selector;
		this._state = new Proxy(options.state, this.proxyHandler());
		this.template = options.template;
		this.efficiency = 0;
		if (options.childOf) {
			const _attachTo =
				this.typeOf(options.childOf) === 'array'
					? (options.childOf as IYogurt<any>[])
					: ([options.childOf] as IYogurt<any>[]);
			_attachTo.forEach((yogurt) => ('attach' in yogurt ? yogurt.attach(this) : false));
		}
	}

	/* Get internal state */
	get state() {
		return this._state;
	}

	/* If state gets replaced create new proxy  */
	set state(newState: T) {
		this._state = new Proxy(newState, this.proxyHandler());
		this.efficientRender();
	}

	/* Dynamically attach child component to this component */
	attach(child: YogChild | YogChildren) {
		if (this.typeOf(child) === 'array') this.children.concat(child);
		else this.children.push(child as YogChild);
	}

	/* Dynamically detach child component of this component  */
	detach(child: YogChild | YogChildren) {
		const isArray = this.typeOf(child) === 'array';

		this.children = this.children.filter((attachedComponent) => {
			if (isArray) return (child as YogChildren).indexOf(attachedComponent) === -1;
			else return attachedComponent !== child;
		});
	}

	/* Check if component has already a render request */
	private efficientRender() {
		if (this.efficiency) {
			window.cancelAnimationFrame(this.efficiency);
		}

		this.efficiency = window.requestAnimationFrame(() => this.render());
	}

	/* Utility function to get user friendly obj type */
	private typeOf(obj: any) {
		if (obj === undefined) return 'undefined';
		if (obj === null) return 'null';
		return obj.toString().slice(8, -1).toLowerCase();
	}

	/* ProxyHandler to request a rerender on prop update */
	private proxyHandler() {
		return {
			get: (obj: T, prop: keyof T): ProxyConstructor | T[keyof T] => {
				if (['object', 'array'].indexOf(this.typeOf(obj[prop])) > -1) {
					return new Proxy(obj[prop] as any, this.proxyHandler());
				}
				return obj[prop];
			},
			set: (obj: T, prop: keyof T, value: T[keyof T]) => {
				if (obj[prop] === value) return true;
				obj[prop] = value;
				this.efficientRender();
				return true;
			},
			deleteProperty: (obj: T, prop: keyof T) => {
				delete obj[prop];
				this.efficientRender();
				return true;
			},
		};
	}

	/* Generate DOM elements bases on string */
	private stringComponent(template: string) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(template, 'text/html');
		return doc.body;
	}

	/* Utility function to get user friendly html5 node type */
	private getNodeType(node: HTMLElement) {
		if (node.nodeType === 3) return 'text';
		if (node.nodeType === 8) return 'comment';
		return node.tagName.toLowerCase();
	}

	/* Utility function to get user friendly html5 node content */
	private getNodeContent(node: HTMLElement) {
		if (node.childNodes && node.childNodes.length > 0) return null;
		return node.textContent;
	}

	/* Utility function to get a map of all the inline styles applied to html5 node */
	private getStyleMap(styles: string) {
		return styles.split(';').reduce((arr: StyleArray, style: string) => {
			const col = style.indexOf(':');
			if (col) {
				arr.push({
					name: style.slice(0, col).trim(),
					value: style.slice(col + 1).trim(),
				});
			}
			return arr;
		}, [] as StyleArray);
	}

	/* Utility function to remove specific inline styles applied to html5 node */
	private removeStyles(elem: HTMLElement, styles: string[]) {
		//@ts-ignore
		styles.forEach((style: string) => (elem.style[style] = ''));
	}

	/* Utility function to update specific inline styles value */
	private changeStyles(elem: HTMLElement, styles: StyleArray) {
		//@ts-ignore
		styles.forEach((style) => (elem.style[style.name] = style.value));
	}

	/* Utility function to compare old and new style property and update accordingly */
	private diffStyles(elem: HTMLElement, styles: string) {
		const styleMap = this.getStyleMap(styles);

		const remove = [...elem.style].filter(
			(style: string) =>
				//@ts-ignore
				styleMap.find((newStyle) => newStyle.name === style && newStyle.value === elem.style[style]) === undefined
		);

		this.removeStyles(elem, remove);
		this.changeStyles(elem, styleMap);
	}

	/* Utility function to add attributes to html5 node */
	private addAttributes(elem: HTMLElement, atts: AttrArray) {
		atts.forEach((attribute) => {
			if (attribute.att === 'class') {
				elem.className = attribute.value;
			} else if (attribute.att === 'style') {
				this.diffStyles(elem, attribute.value);
			} else {
				if (attribute.att in elem) {
					try {
						//@ts-ignore
						elem[attribute.att] = attribute.value;
						//@ts-ignore
						if (!elem[attribute.att] && elem[attribute.att] !== 0) {
							//@ts-ignore
							elem[attribute.att] = true;
						}
					} catch (e) {}
				}
				try {
					elem.setAttribute(attribute.att, attribute.value);
				} catch (e) {}
			}
		});
	}

	/* Utility function to remove attributes from html5 node */
	private removeAttributes(elem: HTMLElement, atts: AttrArray) {
		atts.forEach((attribute) => {
			if (attribute.att === 'class') {
				elem.className = '';
			} else if (attribute.att === 'style') {
				this.removeStyles(elem, [...elem.style].slice());
			} else {
				if (attribute.att in elem) {
					try {
						//@ts-ignore
						elem[attribute.att] = '';
					} catch (e) {}
				}
				try {
					elem.removeAttribute(attribute.att);
				} catch (e) {}
			}
		});
	}

	/* Utility function to check if attribute is one of 'checked' or 'value' and get it */
	private getDynamicAttributes(node: HTMLElement, atts: AttrArray, isTemplate: boolean) {
		['checked', 'value'].forEach((prop) => {
			if (
				//@ts-ignore
				(!node[prop] && node[prop] !== 0) ||
				(isTemplate && node.tagName.toLowerCase() === 'option' && prop === 'selected') ||
				(isTemplate && node.tagName.toLowerCase() === 'select' && prop === 'value')
			)
				return;
			//@ts-ignore
			atts.push(this.getAttribute(prop, node[prop]));
		});
	}

	/* Utility function to get attributes of html5 node except for 'value' and 'checked' */
	private getBaseAttributes(node: HTMLElement, isTemplate: boolean) {
		return [...node.attributes].reduce((arr, attribute) => {
			if (
				(['checked', 'value'].indexOf(attribute.name) < 0 || (isTemplate && attribute.name === 'selected')) &&
				(attribute.name.length > 7 ? attribute.name.slice(0, 7) !== 'default' : true)
			) {
				arr.push(this.getAttribute(attribute.name, attribute.value));
			}
			return arr;
		}, [] as AttrArray);
	}

	/* Utility function to create custom obj with name and value of an attribute of a html5 node */
	private getAttribute(name: string, value: string) {
		return {
			att: name,
			value: value,
		};
	}

	/* Utility function to return all attributes of a html5 node */
	private getAttributes(node: HTMLElement, isTemplate: boolean) {
		if (node.nodeType !== 1) return [];
		const atts = this.getBaseAttributes(node, isTemplate);
		this.getDynamicAttributes(node, atts, isTemplate);
		return atts;
	}

	/* Utility function to compare old and new attributes properties and update accordingly */
	private diffAtts(template: HTMLElement, elem: HTMLElement) {
		const templateAtts = this.getAttributes(template, true);
		const elemAtts = this.getAttributes(elem, false);

		const remove = elemAtts.filter((att) => {
			if (['checked', 'value'].indexOf(att.att) > -1) return false;
			const getAtt = templateAtts.find((newAtt) => att.att === newAtt.att);
			return getAtt === undefined;
		});

		const change = templateAtts.filter((att) => {
			const getAtt = elemAtts.find((elemAtt) => att.att === elemAtt.att);
			return getAtt === undefined || getAtt!.value !== att.value;
		});

		this.addAttributes(elem, change);
		this.removeAttributes(elem, remove);
	}

	/* Utility function to update only elements of DOM tree that have changed their attributes or content */
	private diffingDOM(template: HTMLElement, elem: HTMLElement | DocumentFragment, children: string[]) {
		const domNodes = [...elem.childNodes].slice();
		const templateNodes = [...template.childNodes].slice();

		let count = domNodes.length - templateNodes.length;
		if (count > 0) {
			for (; count > 0; count--) {
				domNodes[domNodes.length - count]!.parentNode!.removeChild(domNodes[domNodes.length - count]);
			}
		}

		templateNodes.forEach((node: ChildNode, index: number) => {
			if (!domNodes[index]) {
				elem.appendChild(node.cloneNode(true));
				return;
			}

			if (this.getNodeType(node as HTMLElement) !== this.getNodeType(domNodes[index] as HTMLElement)) {
				domNodes[index]!.parentNode!.replaceChild(node.cloneNode(true), domNodes[index]);
				return;
			}

			this.diffAtts(node as HTMLElement, domNodes[index] as HTMLElement);

			const isChild = children.filter(
				(cihld) => node.nodeType !== 3 && (node as HTMLElement).matches(cihld)
			);
			if (isChild.length > 0) return;

			const templateContent = this.getNodeContent(node as HTMLElement);
			if (templateContent && templateContent !== this.getNodeContent(domNodes[index] as HTMLElement)) {
				domNodes[index].textContent = templateContent;
			}

			if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
				(domNodes[index] as HTMLElement).innerHTML = '';
				return;
			}

			if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
				const fragment = document.createDocumentFragment();
				this.diffingDOM(node as HTMLElement, fragment, children);
				domNodes[index].appendChild(fragment);
				return;
			}

			if (node.childNodes.length > 0) {
				this.diffingDOM(node as HTMLElement, domNodes[index] as HTMLElement, children);
			}
		});
	}

	/* Call the render method on all children attached to this component  */
	private renderChildren(children: YogChildren) {
		if (!children) return;
		children.forEach((yogurt) => {
			if ('render' in yogurt) yogurt.render();
		});
	}

	/* Render the component using DOM diffing and emit a 'render' event at the end */
	render() {
		const node = document.querySelector(this.elem) as HTMLElement;
		const templateHTML = this.stringComponent(this.template(this._state));
		const childrenElem = this.children.map((child) => child.elem);

		this.diffingDOM(templateHTML, node, childrenElem);

		node.dispatchEvent(new CustomEvent('render', { bubbles: true, detail: this._state }));

		this.renderChildren(this.children);
	}
}

export default Yogurt;
