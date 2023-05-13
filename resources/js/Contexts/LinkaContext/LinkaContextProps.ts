import { AlertColor } from "@mui/material";
import React from "react";

export interface ILinka {
    open?: boolean;
    children: React.ReactNode;
}

export interface IToast {
    open?: boolean;
    timeout?: number;
    type?: AlertColor;
    title?: string;
    description?: string;
}

export type LinkaContextType = {
    doDrawer: (drawerMessage: ILinka) => void;
    doDrawerClose: () => void;
    getDrawerState: () => boolean;
    doLoading: (state: boolean) => void;
    doLoadingToggle: () => void;
    doToast: (toastMessage: IToast) => void;
};
