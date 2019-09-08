var chai = require('chai');
var enzyme = require('enzyme');
var reactIntl = require('react-intl');

/**
 * Utility functions to help testing React components with {@link https://airbnb.io/enzyme/ Enzyme}.
 *
 * @module enzyme
 */
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

function getEvent(type, props) {
  return Object.assign({
    type: type,

    preventDefault: function preventDefault() {},

    stopPropagation: function stopPropagation() {}

  }, props);
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

function shallowSimulate(target, eventData) {
  var wrapper = target instanceof enzyme.ShallowWrapper ? target : enzyme.shallow(target);
  var eventList = Array.isArray(eventData) ? eventData : [eventData];

  for (var i = 0, len = eventList.length; i < len; i++) {
    var evt = eventList[i];
    evt = typeof evt === 'string' ? getEvent(evt) : getEvent('', evt);
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

function checkWrapperAndUnmount(target, checkSet, settings) {
  if (!settings) {
    // eslint-disable-next-line no-param-reassign
    settings = {};
  }

  var expectFunc = settings.expect || chai.expect;
  var wrapper = target instanceof enzyme.ShallowWrapper ? target : enzyme.shallow(target);

  if (settings.setProps) {
    wrapper.setProps(settings.setProps);
  }

  var check = checkSet.state;

  if (check) {
    for (var field in check) {
      expectFunc(wrapper.state(field)).eql(check[field]);
    }
  }

  check = checkSet.prop;

  if (check) {
    for (var field$1 in check) {
      expectFunc(wrapper.prop(field$1)).eql(check[field$1]);
    }
  }

  check = checkSet.hasClass;

  if (check) {
    if (Array.isArray(check)) {
      for (var i = 0, len = check.length; i < len; i++) {
        expectFunc(wrapper.hasClass(check[i])).equal(true);
      }
    } else {
      for (var field$2 in check) {
        expectFunc(wrapper.hasClass(field$2)).equal(check[field$2]);
      }
    }
  }

  if ('html' in checkSet) {
    expectFunc(wrapper.html()).equal(checkSet.html);
  }

  if ('text' in checkSet) {
    expectFunc(wrapper.text()).equal(checkSet.text);
  }

  check = checkSet.type;

  if (check) {
    expectFunc(wrapper.type()).equal(check);
  }

  check = checkSet.check;

  if (check) {
    check(wrapper);
  }

  wrapper.unmount();
}

/**
 * Utility functions to test code that uses {@link https://github.com/formatjs/react-intl/ react-intl}.
 *
 * @module intl
 */
var intlCache = reactIntl.createIntlCache();
/**
 * Create object that provides access to i18n/intl functions ({@link https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape IntlShape}).
 *
 * @param {Object | string} [props]
 *      Properties or locale of object that will be created.
 *      By default the following value is used for `props` parameter: `{locale: 'en'}`.
 * @return {Object}
 *      Object that provides access to i18n/intl functions ({@link https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape IntlShape}).
 */

function getIntl(props) {
  var intlProps;

  if (props) {
    intlProps = typeof props === 'string' ? {
      locale: props
    } : props;
  } else {
    intlProps = {
      locale: 'en'
    };
  }

  return reactIntl.createIntl(intlProps, intlCache);
}
/**
 * Add `intl` field in the given object.
 * Value of the field is an object that provides access to i18n/intl functions
 * ({@link https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape IntlShape}).
 *
 * @param {Object} [target]
 *      Target object into which `intl` field should be added.
 *      If target object is not specified, newly created object will be used and returned.
 * @param {Object | string} [intlProps]
 *      Properties or locale of `intl` object that will be created.
 * @return {Object}
 *      Object with `intl` field (value of `target` parameter or newly created object when `target` is not specified).
 */

function addIntlProp(target, intlProps) {
  var result = target || {};
  result.intl = getIntl(intlProps);
  return result;
}

exports.getEvent = getEvent;
exports.shallowSimulate = shallowSimulate;
exports.checkWrapperAndUnmount = checkWrapperAndUnmount;
exports.getIntl = getIntl;
exports.addIntlProp = addIntlProp;
//# sourceMappingURL=react-test-util.js.map
