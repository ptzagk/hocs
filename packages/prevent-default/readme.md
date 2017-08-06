# :no_entry: prevent-default

[![npm](https://img.shields.io/npm/v/@hocs/prevent-default.svg?style=flat-square)](https://www.npmjs.com/package/@hocs/prevent-default) [![ci](https://img.shields.io/travis/deepsweet/hocs/master.svg?style=flat-square)](https://travis-ci.org/deepsweet/hocs) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/hocs/master.svg?style=flat-square)](https://codecov.io/github/deepsweet/hocs) [![deps](https://david-dm.org/deepsweet/hocs.svg?path=packages/prevent-default&style=flat-square)](https://david-dm.org/deepsweet/hocs?path=packages/prevent-default)

Part of a [collection](https://github.com/deepsweet/hocs) of Higher-Order Components for React, especially useful with [Recompose](https://github.com/acdlite/recompose).

Decouples [`e.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) side effect from handlers like form submitting or clicking a link.

## Install

```
yarn add recompose @hocs/prevent-default
```

## Usage

```js
preventDefault(
  ...handlers: Array<string>
): HigherOrderComponent
```

```js
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import preventDefault from '@hocs/prevent-default';

const submitAction = (value) => console.log(`Submit: ${value}`);

const Demo = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input value={value} onChange={onChange}/>
    <button>Submit</button>
  </form>
);

export default compose(
  withState('value', 'setValue', ''),
  withHandlers({
    onChange: ({ setValue }) => (e) => setValue(e.target.value),
    onSubmit: ({ value }) => () => submitAction(value)
  }),
  preventDefault('onSubmit')
)(Demo);
```

:tv: [Check out live demo](https://www.webpackbin.com/bins/-KqnJNtaPDRKO4uCsxw6).
