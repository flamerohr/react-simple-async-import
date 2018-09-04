import React, { Component } from 'react';

const noop = () => null;

const composeDynamicImport = (options) => {
  const load = options.load;
  const refresh = options.refresh || noop;
  const initial = options.initial || noop;

  class DynamicImportComposer extends Component {
    constructor(props) {
      super(props);

      this.saveImport = this.saveImport.bind(this);
      this.loadImport = this.loadImport.bind(this);

      this.state = { Imported: initial };

      refresh(this.loadImport, props);
    }

    componentWillMount() {
      this.loadImport();
    }

    saveImport(result) {
      if (!result) {
        return;
      }
      if (result.default) {
        this.setState({ Imported: result.default });
        return;
      }
      this.setState({ Imported: result });
    }

    loadImport() {
      Promise.resolve(load(this.props)).then(this.saveImport);
    }

    render() {
      const Imported = this.state.Imported;

      return <Imported {...this.props} />;
    }
  }

  return DynamicImportComposer;
};

export default composeDynamicImport;
