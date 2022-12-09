import renderer from 'react-test-renderer';
import {Div, P, Label} from './Component'

it('Div', () => {
    const result = renderer.create(
        <Div params={"Hello"}></Div>
    );
    expect(result).toMatchSnapshot();
})

it('P', () => {
    const result = renderer.create(
        <P params={"Another hello!"}/>
    );
    expect(result).toMatchSnapshot();
})

it('Label', () => {
    const result = renderer.create(
        <Label params={"Label"}/>
    );
    expect(result).toMatchSnapshot();
})