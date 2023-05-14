import React from "react";
import { LinkaContext, LinkaContextType } from "@/Contexts/LinkaContext";

export const useContexts = () => {
    const {
        doLoading,
        doLoadingToggle,
        doToast,
        doDrawer,
        doDrawerClose,
        getDrawerState,
    } = React.useContext(LinkaContext) as LinkaContextType;

    return {
        doToast,
        doLoading,
        doLoadingToggle,
        doDrawer,
        doDrawerClose,
        getDrawerState,
    } as const;
};

export default useContexts;
