import {
    Directive,
    EmbeddedViewRef,
    Inject,
    Input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

export class ForMapOfContext<T> {
    destroyed = false;

    constructor(readonly $implicit: T) {}
}

@Directive({selector: '[ngForMap][ngForMapOf]'})
export class ForMapOfDirective<T, G> {
    @Input()
    set ngForMapOf(map: Map<T, G>) {
        for (const key of this.map.keys()) {
            if (!map.has(key)) {
                const value = this.map.get(key)!;

                value.context.destroyed = true;
                this.map.delete(key);
                setTimeout(() => {
                    value.destroy();
                }, this.release);
            }
        }

        for (const key of map.keys()) {
            if (!this.map.has(key)) {
                this.map.set(
                    key,
                    this.viewContainerRef.createEmbeddedView(
                        this.template,
                        new ForMapOfContext(key),
                    ),
                );
            }
        }
    }

    @Input()
    release = 1000;

    private readonly map: Map<T, EmbeddedViewRef<ForMapOfContext<T>>> = new Map();

    constructor(
        @Inject(ViewContainerRef)
        private readonly viewContainerRef: ViewContainerRef,
        @Inject(TemplateRef)
        private readonly template: TemplateRef<ForMapOfContext<T>>,
    ) {}

    static ngTemplateContextGuard<T, G>(
        _dir: ForMapOfDirective<T, G>,
        _ctx: unknown,
    ): _ctx is ForMapOfContext<T> {
        return true;
    }
}
