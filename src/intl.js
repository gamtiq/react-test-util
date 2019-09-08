/**
 * Utility functions to test code that uses {@link https://github.com/formatjs/react-intl/ react-intl}.
 *
 * @module intl
 */

import { createIntl, createIntlCache } from 'react-intl';

const intlCache = createIntlCache();

/**
 * Create object that provides access to i18n/intl functions ({@link https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape IntlShape}).
 *
 * @param {Object | string} [props]
 *      Properties or locale of object that will be created.
 *      By default the following value is used for `props` parameter: `{locale: 'en'}`.
 * @return {Object}
 *      Object that provides access to i18n/intl functions ({@link https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape IntlShape}).
 */
export function getIntl(props) {
    let intlProps;
    if (props) {
        intlProps = typeof props === 'string'
            ? {locale: props}
            : props;
    }
    else {
        intlProps = {locale: 'en'};
    }

    return createIntl(intlProps, intlCache);
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
export function addIntlProp(target, intlProps) {
    const result = target || {};
    result.intl = getIntl(intlProps);

    return result;
}
