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
  function DynamicImport(props, ref) {
    const [Component, setComponent] = useState(lazy(load));

    const renewComponent = useCallback(() => {
      setComponent(lazy(load));
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
