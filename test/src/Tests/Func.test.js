import {mult, pow, mod} from './Func'

test("mult", () => {
    expect(mult(5,6)).toEqual(30);
    expect(mult(11,6)).toEqual(66);
    expect(mult(11,11)).toEqual(121);
    expect(mult(-5,10)).toEqual(-50);
})

test("pow", () => {
    expect(pow(2,10)).toEqual(1024);
    expect(pow(5,3)).toEqual(125);
    expect(pow(8,3)).toEqual(512);
    expect(pow(2,-1)).toEqual(0.5);
})

test("mod", () => {
    expect(mod(5,2)).toEqual(1);
    expect(mod(256,2)).toEqual(0);
    expect(mod(14,5)).toEqual(4);
    expect(mod(27,8)).toEqual(3);
})
