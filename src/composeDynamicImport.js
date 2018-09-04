import React, { Component } from 'react';

const noop = () => null;

const composeDynamicImport = (options) => {
  const load = options.load;
  const refresh = options.refresh || noop;
  const loading = options.loading || noop;

  class DynamicImportComposer extends Component {
    constructor(props) {
      super(props);

      this.saveImport = this.saveImport.bind(this);
      this.loadImport = this.loadImport.bind(this);

      this.state = {
        Imported: loading,
        loading: false
      };

      refresh(this.loadImport, props);
    }

    componentWillMount() {
      this.loadImport();
    }

    saveImport(result) {
      this.setState({ loading: false });
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
      this.setState({ loading: true });
      Promise.resolve(load(this.props)).then(this.saveImport);
    }

    render() {
      const Imported = this.state.loading ? loading : this.state.Imported;

      return <Imported {...this.props} />;
    }
  }

  return DynamicImportComposer;
};

export default composeDynamicImport;
