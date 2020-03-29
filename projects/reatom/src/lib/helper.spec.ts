import { getField } from './helper';

describe('helper', () => {
    describe('getField', () => {
        const demoObject = {
            loading: false,
            deepField: {
                foo: {
                    toggle: true,
                    bar: true,
                },
            },
            list: [
                'a', 'b',
            ],
        };

        it('empty path', () => {
            expect(getField()(demoObject)).toBe(demoObject);
        });

        it('loading', () => {
            expect(getField('loading')(demoObject)).toBe(demoObject.loading);
        });

        it('deepField', () => {
            expect(getField('deepField')(demoObject)).toBe(demoObject.deepField);
        });

        it('invalid', () => {
            expect(getField('invalid')(demoObject)).toBe(undefined);
        });

        it('loading.invalid', () => {
            expect(getField('loading', 'invalid')(demoObject)).toBe(undefined);
        });

        it('deepField.foo.bar', () => {
            expect(getField('deepField', 'foo', 'bar')(demoObject)).toBe(demoObject.deepField.foo.bar);
        });

        it('deepField.invalid.invalid', () => {
            expect(getField('deepField', 'invalid', 'invalid')(demoObject)).toBe(undefined);
        });
    });
});
