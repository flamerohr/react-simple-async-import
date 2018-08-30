# React simple async import

A simple composition function that creates a Component which helps easily facilitate async imports.

## Install

```sh
npm install react-simple-async-import
```

## How it works

We compose a react `Component` by providing two callbacks to load and refresh your given component, the component will act as a simple placeholder for when your component is loading.

The basic gist of the composition will look like this:

```js
import composeDynamicImport from 'react-simple-async-import';

const options = {
  load: (props) => import('../components/Dashboard'),
  refresh: (callback) => module.hot.accept('../components/Dashboard', callback),
};
const MySection = composeDynamicImport(options);
```

It is important ot return a Promise (with result) in the `load` callback. This ensures that the composed component can capture the imported result.

The result can be in the `default` key as with ES6 `export default` behaviour, or the actual component but just make it doesn't have a default key.

## Available options

| Key | Type | Default | Description |
|--- | :---: | :---: | --- |
| `load` | function | (required) | The loading function to call when the target component is needed, the function is passed in the Component's `props` at the time - this could help choose a set of components if desired |
| `refresh` | function | (required) | A function that is called to setup a way to call the "load" function again - the aim is to enable hot-loading the component, the function is passed a `callback` which should be called when refresh needs to happen |
| `initial` | Component | `null` | The initial component to use before loading the target component is finished, such as a loading screen or icon |