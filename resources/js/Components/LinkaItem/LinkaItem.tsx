import { LoadingIcon } from "@/Components/LoadingIcon/LoadingIcon";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { IconButton, ListItem } from "@mui/material";
import _ from "lodash";
import React from "react";
import LinkaItemProps from "./LinkaItemProps";

export const LinkaItem: React.FC<LinkaItemProps> = (props) => {
    if (!_.get(props, "item.url")) {
        return <></>;
    }

    return (
        <ListItem
            divider
            disablePadding
            secondaryAction={
                <IconButton
                    edge="end"
                    onClick={() => {
                        console.log(1);
                    }}
                >
                    <LoadingIcon
                        loading={false}
                        icon={<KeyboardArrowRightOutlinedIcon />}
                    />
                </IconButton>
            }
        >
            HERE
        </ListItem>
    );
};

export default LinkaItem;
