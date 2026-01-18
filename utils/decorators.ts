import { test } from '@playwright/test';

export function boxedStep(stepDescription?: string) {
    return function <This, Args extends any[], Return>(
        target: (this: This, ...args: Args) => Promise<Return>,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
    ) {
        const methodName = String(context.name);

        return async function (this: This, ...args: Args): Promise<Return> {
            const className = (this as any).constructor.name;
            const finalStepName = stepDescription || `${className}.${methodName}`;

            return await test.step(finalStepName, async () => {
                return await target.call(this, ...args);
            }, { box: true });
        };
    };
}
