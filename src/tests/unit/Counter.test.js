import Counter from '../../Counter.vue';
import {render} from '@testing-library/vue';

test('increments value on click', () => {
    // The render method returns a collection of utilities to query your component.
    const {debug} = render(Counter)

    debug()
})
