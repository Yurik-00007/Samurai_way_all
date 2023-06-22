import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus Component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus updateUserStatus={() => {
        }} status={'it-kamasutra.com'}/>)
        const instance = component.getInstance()
        expect(instance?.props.status).toBe('it-kamasutra.com')
    })
    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus updateUserStatus={() => {
        }} status={'it-kamasutra.com'}/>)
        const root = component.root
        let span = root?.findByType('span')
        expect(span).not.toBeNull()
    })
    test('after creation <input> should be displayed', () => {
        const component = create(<ProfileStatus updateUserStatus={() => {
        }} status={'it-kamasutra.com'}/>)
        const root = component.root
        //let input = root?.findByType('input')
        expect(() => {
            let input = root?.findByType('input')
        }).toThrow()
    })
    test('after creation <span> with status should be displayed with correct status', () => {
        const component = create(<ProfileStatus updateUserStatus={() => {
        }} status={'it-kamasutra.com'}/>)
        const root = component.root
        let span = root?.findByType('span')
        expect(span?.children[0]).toBe('it-kamasutra.com')
    })
    test('input should be displayed in editMode instread of span', () => {
        const component = create(<ProfileStatus updateUserStatus={() => {
        }} status={'it-kamasutra.com'}/>)
        const root = component.root
        let span = root?.findByType('span')
        span?.props.onDoubleClick()
        let input = root?.findByType('input')
        expect(input?.props.value).toBe('it-kamasutra.com')
    })
    

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(
            <ProfileStatus
                updateUserStatus={mockCallback}
                status={'it-kamasutra.com'}
            />
        );

        const rootInstance = component.root;
        const span = rootInstance.findByType('span');
        span.props.onDoubleClick();

        const input = rootInstance.findByType('input');
        input.props.onBlur();

        expect(mockCallback.mock.calls.length).toBe(1);
    })
})