import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

export const useAction = (actionFn) => {
  const dispatch = useDispatch();
  const memedAct = useMemo(() => actionFn, [actionFn]);
  return useCallback(
    function callback() {
      dispatch(memedAct.apply(null, arguments));
    },
    [dispatch, memedAct]
  );
};
