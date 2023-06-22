import {create} from "react-test-renderer";
import Paginator from "./Paginator";

describe('Poginator component test', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = create(
            <Paginator
                totalItemsCount={11}
                pageSize={1}
                currentPage={1}
                onPageChanged={() => {
                }}
                portionSize={10}
            />)
        const root = component.root
        let spans = root?.findAllByType('span')
        expect(spans.length).toBe(10)
    })
    test('if pages count is more then 10 button NEXT should be present', () => {
        const component = create(
            <Paginator
                totalItemsCount={11}
                pageSize={1}
                currentPage={1}
                onPageChanged={() => {
                }}
                portionSize={10}
            />)
        const root = component.root
        let buttons = root?.findAllByType('button')
        expect(buttons.length).toBe(2)
    })

})