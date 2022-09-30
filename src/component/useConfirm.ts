import { Context, RouteInterface } from "../types";

import { ReactContextValue } from "../make/reactContextProvider/types";
import { useContext, useEffect, Context as ReactContext } from "react";

export function useConfirm<
  MAP extends RouteInterface<any, any, any, C>,
  C extends Context
>(
  onConfirm: (() => Promise<boolean>) | null,
  ReactContext: ReactContext<ReactContextValue<MAP, C>>
) {
  const { confirm } = useContext(ReactContext);
  useEffect(() => {
    if (onConfirm) {
      return confirm(onConfirm);
    }
    return;
  }, [onConfirm]);
}
