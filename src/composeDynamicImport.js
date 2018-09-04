import React, { Component } from "react";

const noop = () => null;

const composeDynamicImport = options => {
  const load = options.load;
  const refresh = options.refresh || noop;
  const loading = options.loading || noop;
  const error = options.error || noop;

  class DynamicImportComposer extends Component {
    constructor(props) {
      super(props);

      this.saveImport = this.saveImport.bind(this);
      this.loadImport = this.loadImport.bind(this);

      this.state = {
        Imported: loading,
        loading: false,
        error: null
      };

      refresh(this.loadImport, props);
    }

    componentWillMount() {
      this.loadImport();
    }

    saveImport(result) {
      this.setState({ loading: false, error: null });
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
      this.setState({ loading: true, error: null });
      Promise.resolve(load(this.props))
        .then(this.saveImport)
        .catch(e => {
          this.setState({ error: e.toString() });
        });
    }

    render() {
      if (this.state.error) {
        const Error = error;

        return <Error {...this.props} error={this.state.error} />
      }
      const Imported = this.state.loading ? loading : this.state.Imported;

      return <Imported {...this.props} />;
    }
  }

  return DynamicImportComposer;
};

export default composeDynamicImport;
