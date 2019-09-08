# react-test-util <a name="start"></a>

Useful utility functions for testing React components.

[![NPM version](https://badge.fury.io/js/react-test-util.png)](http://badge.fury.io/js/react-test-util)

## Table of contents

* [Installation](#install)
* [Examples](#examples)
* [API](#api)
* [Contributing](#contributing)
* [License](#license)

## Installation <a name="install"></a> [&#x2191;](#start)

    npm install react-test-util --save-dev

Peer dependencies:
* [Enzyme](https://airbnb.io/enzyme/) for using [/enzyme](#enzyme);
* [react-intl](https://github.com/formatjs/react-intl/) for using [/intl](#intl).

### Examples <a name="examples"></a> [&#x2191;](#start)

```js
import { expect } from 'chai';
import { checkWrapperAndUnmount, shallowSimulate } from 'react-test-util/enzyme';
import { getIntl } from 'react-test-util/intl';

import SomeComponent from '../src/component/SomeComponent';

const wrapper = shallowSimulate(<SomeComponent someProp="value" intl={getIntl('ru')} />, 'click');

expect( wrapper.state('visible') )
    .equal( true );

const showClass = 'test-show-class';
const hideClass = 'test-hide-class';
checkWrapperAndUnmount(
    shallowSimulate(<SomeComponent showClass={showClass} hideClass={hideClass} />, ['click', 'mouseLeave']),
    {
        state: {
            visible: false
        },
        hasClass: {
            [showClass]: true,
            [hideClass]: false
        }
    }
);

```

## API <a name="api"></a> [&#x2191;](#start)

### /enzyme <a name="enzyme"></a>

Utility functions to help testing React components with [Enzyme](https://airbnb.io/enzyme/).

#### getEvent(type: string, props?: object): object

Create a mock object representing event data.

#### shallowSimulate(target, eventData): [ShallowWrapper](https://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html)

Simulate receiving of specified event by component/element.

See [simulate](http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html).

Arguments:

* `target: ReactElement | ShallowWrapper` - Component that will undergo event simulation or [ShallowWrapper](https://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html) for such component.
* `eventData: array | object | string` - Event type, object with event properties or array containing such items.

Returns passed or created [ShallowWrapper](https://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html)
for which event simulation was made.

#### checkWrapperAndUnmount(target, checkSet, settings)

Make specified checks for component's shallow wrapper and then unmount component.

Arguments:

* `target: ReactElement | ShallowWrapper` - Component that will undergo checks or [ShallowWrapper](https://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html) for such component.
* `checkSet: object` - Specifies checks that will be made.
* `checkSet.hasClass?: object | string[]` - Checks for CSS classes which the component should or should not have.
When array of strings is passed it means that the component should have all specified CSS classes.
In case when object is passed, object's fields are CSS classes and field values are boolean values
that specifies whether component should (when `true`) or should not (when `false`) have the corresponding class.
See [hasClass](https://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html).
* `checkSet.html?: string` - Checks whether component has the specified rendered HTML markup.
See [html](https://airbnb.io/enzyme/docs/api/ShallowWrapper/html.html).
* `checkSet.prop?: object` - Checks whether component has the specified props.
Objects fields are prop names, field values are values that should have corresponding props.
See [prop](https://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html).
* `checkSet.state?: object` - Checks whether component has the specified state fields.
Objects fields are state field names, field values are values that should have corresponding state fields.
See [state](https://airbnb.io/enzyme/docs/api/ShallowWrapper/state.html).
* `checkSet.text?: string` - Checks whether component has the specified rendered text.
See [text](https://airbnb.io/enzyme/docs/api/ShallowWrapper/text.html).
* `checkSet.type?: Function | string` - Checks whether component's node has the specified type.
See [type](https://airbnb.io/enzyme/docs/api/ShallowWrapper/type.html).
* `settings?: object` - Operation settings.
* `settings.expect?: object` - Assertion function that should be used for checking.
Should have API similar to [chai's expect](https://www.chaijs.com/api/bdd/)
(at least [equal](https://www.chaijs.com/api/bdd/#method_equal) and
[eql](https://www.chaijs.com/api/bdd/#method_eql) methods).
By default [chai's expect](https://www.chaijs.com/api/bdd/) is used.
* `settings.setProps?: object` - Specifies props that should be set for component before checks are started.
See [setProps](https://airbnb.io/enzyme/docs/api/ShallowWrapper/setProps.html).

### /intl <a name="intl"></a>

Utility functions to test code that uses [react-intl](https://github.com/formatjs/react-intl/).

#### getIntl(props?: object | string): IntlShape

Create object that provides access to i18n/intl functions
([IntlShape](https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape)).

`props` specifies properties or locale of object that will be created.

#### addIntlProp(target?: object, intlProps?: object): object

Add `intl` field in the given object.
Value of the field is an object that provides access to i18n/intl functions
([IntlShape](https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape)).

Arguments:

* `target?: object` - Target object into which `intl` field should be added.
If target object is not specified, newly created object will be used and returned.
* `intlProps?: object` - Properties or locale of `intl` object that will be created.

Returns object with `intl` field (value of `target` parameter or newly created object when `target` is not specified).

## Contributing <a name="contributing"></a> [&#x2191;](#start)
In lieu of a formal styleguide, take care to maintain the existing coding style.

## License <a name="license"></a> [&#x2191;](#start)
Copyright (c) 2019 Denis Sikuler  
Licensed under the MIT license.
