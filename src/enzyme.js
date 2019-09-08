/**
 * Utility functions to help testing React components with {@link https://airbnb.io/enzyme/ Enzyme}.
 *
 * @module enzyme
 */

import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';

/**
 * Create a mock object representing event data.
 *
 * @param {string} type
 *      Event type.
 * @param {object} [props]
 *      Event properties.
 * @return {object}
 *      Object representing event data.
 * @author Denis Sikuler
 */
export function getEvent(type, props) {
    return Object.assign(
        {
            type,
            preventDefault() {},
            stopPropagation() {},
        },
        props
    );
}

/**
 * Simulate receiving of specified event by component/element.
 * See {@link http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html simulate}.
 *
 * @param {ReactElement | ShallowWrapper} target
 *      Component that will undergo event simulation or
 *      {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html ShallowWrapper} for such component.
 * @param {array | object | string} eventData
 *      Event type, object with event properties or array containing such items.
 * @return {ShallowWrapper}
 *      Passed or created {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html ShallowWrapper}
 *      for which event simulation was made.
 * @see {@link http://airbnb.io/enzyme/docs/api/shallow.html}
 * @see {@link http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html}
 */
export function shallowSimulate(target, eventData) {
    const wrapper = target instanceof ShallowWrapper
        ? target
        : shallow(target);
    const eventList = Array.isArray(eventData)
        ? eventData
        : [eventData];
    for (let i = 0, len = eventList.length; i < len; i++) {
        let evt = eventList[i];
        evt = typeof evt === 'string'
            ? getEvent(evt)
            : getEvent('', evt);
        wrapper.simulate(evt.type, evt);
    }

    return wrapper;
}

/**
 * Make specified checks for component's shallow wrapper and then unmount component.
 *
 * @param {ReactElement | ShallowWrapper} target
 *      Component that will undergo checks or
 *      {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html ShallowWrapper} for such component.
 * @param {object} checkSet
 *      Specifies checks that will be made.
 * @param {Function} [checkSet.check]
 *      Function that will be called to test component's shallow wrapper.
 *      The wrapper will be passed into the function.
 * @param {object | string[]} [checkSet.hasClass]
 *      Checks for CSS classes which the component should or should not have.
 *      When array of strings is passed it means that the component should have all specified CSS classes.
 *      In case when object is passed, object's fields are CSS classes and field values are boolean values
 *      that specifies whether component should (when `true`) or should not (when `false`) have the corresponding class.
 *      See {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html hasClass}.
 * @param {string} [checkSet.html]
 *      Checks whether component has the specified rendered HTML markup.
 *      See {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/html.html html}.
 * @param {object} [checkSet.prop]
 *      Checks whether component has the specified props.
 *      Objects fields are prop names, field values are values that should have corresponding props.
 *      See {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html prop}.
 * @param {object} [checkSet.state]
 *      Checks whether component has the specified state fields.
 *      Objects fields are state field names, field values are values that should have corresponding state fields.
 *      See {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/state.html state}.
 * @param {string} [checkSet.text]
 *      Checks whether component has the specified rendered text.
 *      See {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/text.html text}.
 * @param {Function | string} [checkSet.type]
 *      Checks whether component's node has the specified type.
 *      See {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/type.html type}.
 * @param {object} [settings]
 *      Operation settings.
 * @param {object} [settings.expect]
 *      Assertion function that should be used for checking.
 *      Should have API similar to {@link https://www.chaijs.com/api/bdd/ chai's expect}
 *      (at least {@link https://www.chaijs.com/api/bdd/#method_equal equal} and
 *      {@link https://www.chaijs.com/api/bdd/#method_eql eql} methods).
 *      By default {@link https://www.chaijs.com/api/bdd/ chai's expect} is used.
 * @param {object} [settings.setProps]
 *      Specifies props that should be set for component before checks are started.
 *      See {@link https://airbnb.io/enzyme/docs/api/ShallowWrapper/setProps.html setProps}.
 * @see {@link http://airbnb.io/enzyme/docs/api/shallow.html}
 */
export function checkWrapperAndUnmount(target, checkSet, settings) {
    if (! settings) {
        // eslint-disable-next-line no-param-reassign
        settings = {};
    }
    const expectFunc = settings.expect || expect;

    const wrapper = target instanceof ShallowWrapper
        ? target
        : shallow(target);

    if (settings.setProps) {
        wrapper.setProps(settings.setProps);
    }

    let check = checkSet.state;
    if (check) {
        for (const field in check) {
            expectFunc( wrapper.state(field) )
                .eql( check[field] );
        }
    }

    check = checkSet.prop;
    if (check) {
        for (const field in check) {
            expectFunc( wrapper.prop(field) )
                .eql( check[field] );
        }
    }

    check = checkSet.hasClass;
    if (check) {
        if (Array.isArray(check)) {
            for (let i = 0, len = check.length; i < len; i++) {
                expectFunc( wrapper.hasClass(check[i]) )
                    .equal( true );
            }
        }
        else {
            for (const field in check) {
                expectFunc( wrapper.hasClass(field) )
                    .equal( check[field] );
            }
        }
    }

    if ('html' in checkSet) {
        expectFunc( wrapper.html() )
            .equal( checkSet.html );
    }

    if ('text' in checkSet) {
        expectFunc( wrapper.text() )
            .equal( checkSet.text );
    }

    check = checkSet.type;
    if (check) {
        expectFunc( wrapper.type() )
            .equal( check );
    }

    check = checkSet.check;
    if (check) {
        check(wrapper);
    }

    wrapper.unmount();
}
