import React, {
  lazy,
  Suspense,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

const noop = () => null;

export function composeDynamicImport({
  load,
  refresh = noop,
  placeholder = null,
}) {
  let initialComponent = lazy(load);

  function DynamicImport(props, ref) {
    const [Component, setComponent] = useState(initialComponent);

    const renewComponent = useCallback(() => {
      initialComponent = lazy(load);
      setComponent(initialComponent);
    }, [setComponent]);

    useEffect(() => {
      refresh(renewComponent);

      return () => {
        refresh(noop);
      };
    }, [renewComponent]);

    return (
      <Suspense fallback={placeholder}>
        <Component {...props} forwardedRef={ref} />
      </Suspense>
    );
  }

  return forwardRef(DynamicImport);
}

export default composeDynamicImport;
