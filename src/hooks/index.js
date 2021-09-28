import { useEffect, useRef } from "react";

export const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

export const usePrevious = (value, initialValue = null) => {
  const prev = useRef(initialValue);
  useEffect(() => {
    prev.current = value;
  });
  return prev.current;
};
