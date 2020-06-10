class Yogurt<T extends object> implements IYogurt<T> {
	public elem: string;
	public template: Template<T>;
	public enabled: boolean = false;
	private _data: T;
	private debounce: number;
	private dynamicAttributes = ['checked', 'selected', 'value'];
	private attached = [] as Attachments;

	constructor(options: Options<T>) {
		this.elem = options.selector;
		this._data = new Proxy(options.data, this.proxyHandler());
		this.template = options.template;
		this.debounce = 0;
		if (options.attachTo) {
			const _attachTo =
				this.trueTypeOf(options.attachTo) === 'array'
					? (options.attachTo as IYogurt<any>[])
					: ([options.attachTo] as IYogurt<any>[]);
			_attachTo.forEach((yogurt) => ('attach' in yogurt ? yogurt.attach(this) : false));
		}
	}

	get data() {
		return this._data;
	}

	set data(newData: T) {
		this._data = new Proxy(newData, this.proxyHandler());
		this.debounceRender();
	}

	attach(attachment: Attachment | Attachments) {
		if (this.trueTypeOf(attachment) === 'array') this.attached.concat(attachment);
		else this.attached.push(attachment as Attachment);
	}

	detach(attachment: Attachment | Attachments) {
		const isArray = this.trueTypeOf(attachment) === 'array';

		this.attached = this.attached.filter((attachedComponent) => {
			if (isArray) return (attachment as Attachments).indexOf(attachedComponent) === -1;
			else return attachedComponent !== attachment;
		});
	}

	private debounceRender() {
		if (this.debounce) {
			window.cancelAnimationFrame(this.debounce);
		}

		this.debounce = window.requestAnimationFrame(() => this.render());
	}

	private trueTypeOf(obj: any) {
		if (obj === undefined) return 'undefined';
		if (obj === null) return 'null';
		return obj.toString().slice(8, -1).toLowerCase();
	}

	private proxyHandler() {
		return {
			get: (obj: T, prop: keyof T): ProxyConstructor | T[keyof T] => {
				if (['object', 'array'].indexOf(this.trueTypeOf(obj[prop])) > -1) {
					return new Proxy(obj[prop] as any, this.proxyHandler());
				}
				return obj[prop];
			},
			set: (obj: T, prop: keyof T, value: T[keyof T]) => {
				if (obj[prop] === value) return true;
				obj[prop] = value;
				this.debounceRender();
				return true;
			},
			deleteProperty: (obj: T, prop: keyof T) => {
				delete obj[prop];
				this.debounceRender();
				return true;
			},
		};
	}

	private stringToHTML(template: string) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(template, 'text/html');
		return doc.body;
	}

	private getNodeType(node: HTMLElement) {
		if (node.nodeType === 3) return 'text';
		if (node.nodeType === 8) return 'comment';
		return node.tagName.toLowerCase();
	}

	private getNodeContent(node: HTMLElement) {
		if (node.childNodes && node.childNodes.length > 0) return null;
		return node.textContent;
	}

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

	private removeStyles(elem: HTMLElement, styles: string[]) {
		//@ts-ignore
		styles.forEach((style: string) => (elem.style[style] = ''));
	}

	private changeStyles(elem: HTMLElement, styles: StyleArray) {
		//@ts-ignore
		styles.forEach((style) => (elem.style[style.name] = style.value));
	}

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

	private getDynamicAttributes(node: HTMLElement, atts: AttrArray, isTemplate: boolean) {
		this.dynamicAttributes.forEach((prop) => {
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

	private getBaseAttributes(node: HTMLElement, isTemplate: boolean) {
		return [...node.attributes].reduce((arr, attribute) => {
			if (
				(this.dynamicAttributes.indexOf(attribute.name) < 0 || (isTemplate && attribute.name === 'selected')) &&
				(attribute.name.length > 7 ? attribute.name.slice(0, 7) !== 'default' : true)
			) {
				arr.push(this.getAttribute(attribute.name, attribute.value));
			}
			return arr;
		}, [] as AttrArray);
	}

	private getAttribute(name: string, value: string) {
		return {
			att: name,
			value: value,
		};
	}

	private getAttributes(node: HTMLElement, isTemplate: boolean) {
		if (node.nodeType !== 1) return [];
		const atts = this.getBaseAttributes(node, isTemplate);
		this.getDynamicAttributes(node, atts, isTemplate);
		return atts;
	}

	private diffAtts(template: HTMLElement, elem: HTMLElement) {
		const templateAtts = this.getAttributes(template, true);
		const elemAtts = this.getAttributes(elem, false);

		const remove = elemAtts.filter((att) => {
			if (this.dynamicAttributes.indexOf(att.att) > -1) return false;
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

	private addDefaultAtts(node: HTMLElement) {
		if (node.nodeType !== 1) return;

		[...node.attributes].forEach((attribute) => {
			if (attribute.name.length < 8 || attribute.name.slice(0, 7) !== 'default') return;
			this.addAttributes(node, [this.getAttribute(attribute.name.slice(7).toLowerCase(), attribute.value)]);
			this.removeAttributes(node, [this.getAttribute(attribute.name, attribute.value)]);
		});

		if (node.childNodes) {
			[...node.childNodes].forEach((childNode) => this.addDefaultAtts(childNode as HTMLElement));
		}
	}

	private diffingDOM(template: HTMLElement, elem: HTMLElement | DocumentFragment, attachments: string[]) {
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
				this.addDefaultAtts(node as HTMLElement);
				elem.appendChild(node.cloneNode(true));
				return;
			}

			if (this.getNodeType(node as HTMLElement) !== this.getNodeType(domNodes[index] as HTMLElement)) {
				domNodes[index]!.parentNode!.replaceChild(node.cloneNode(true), domNodes[index]);
				return;
			}

			this.diffAtts(node as HTMLElement, domNodes[index] as HTMLElement);

			const isAttachment = attachments.filter(
				(attachment) => node.nodeType !== 3 && (node as HTMLElement).matches(attachment)
			);
			if (isAttachment.length > 0) return;

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
				this.diffingDOM(node as HTMLElement, fragment, attachments);
				domNodes[index].appendChild(fragment);
				return;
			}

			if (node.childNodes.length > 0) {
				this.diffingDOM(node as HTMLElement, domNodes[index] as HTMLElement, attachments);
			}
		});
	}

	private renderAttachments(attachments: Attachments) {
		if (!attachments) return;
		attachments.forEach((yogurt) => {
			if ('render' in yogurt) yogurt.render();
		});
	}

	render() {
		const node = document.querySelector(this.elem) as HTMLElement;
		const templateHTML = this.stringToHTML(this.template(this._data));
		const attachments = this.attached.map((attachment) => attachment.elem);

		this.diffingDOM(templateHTML, node, attachments);

		node.dispatchEvent(new CustomEvent('render', { bubbles: true, detail: this._data }));

		this.renderAttachments(this.attached);
	}
}

export default Yogurt;
