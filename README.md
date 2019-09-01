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
  load: () => import('./components/Dashboard'),
  refresh: module.hot && (load => module.hot.accept('./components/Dashboard', load)),
  placeholder: <Placeholder />,
};
const MySection = composeDynamicImport(options);
```

It is important to return a Promise with result in the `load` callback. This ensures that the composed component can capture the imported result.

The result should be in the `default` key following the ES6 `export default` behaviour, this is because we use `React.lazy` under the hood to lazily load the component for us.

## Available options

| Key | Type | Default | Description |
|--- | :---: | :---: | --- |
| `load` | function | (required) | The loading function to call when the target component is needed, the function is passed in the Component's `props` at the time - this could help choose a set of components if desired |
| `refresh` | function | `null` | A function that is called to setup a way to call the "load" function again - the aim is to enable hot-loading the component, the function is passed a `callback` which should be called when refresh needs to happen |
| `placeholder` | Text or Rendered component | `null` | The loading component to use when loading the target component, such as a loading text or icon, in the form of `<Placeholder />` |

## Note

I had originally planned to have an `error` option as well, but it made more sense to use `ErrorBoundary` outside this component. I may reconsider as time moves on.