import {LoadingIcon} from "@/Components/LoadingIcon/LoadingIcon";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import {IconButton, ListItem} from "@mui/material";
import _ from "lodash";
import React from "react";
import LinkaItemProps from "./LinkaItemProps";
import {Link, usePage} from "@inertiajs/react";
import CondensedItem from "@/Components/LinkaItem/CondensedItem";
import ExpandedItem from "@/Components/LinkaItem/ExpandedItem";

export const LinkaItem: React.FC<LinkaItemProps> = (props) => {
    // @ts-ignore
    const profile = usePage().props.auth.profile;

    if (!_.get(props, "item.url")) {
        return <></>;
    }

    return (
        <ListItem
            divider
            disablePadding
            secondaryAction={
                <IconButton
                    component={Link}
                    href={route("bookmark.show", props.item.id)}
                    edge="end"
                >
                    <LoadingIcon
                        loading={false}
                        icon={<KeyboardArrowRightOutlinedIcon />}
                    />
                </IconButton>
            }
        >
            {_.get(profile, 'bookmark_view') === "condensed" ? (
                <CondensedItem {...props} />
            ) : (
                <ExpandedItem {...props} />
            )}
        </ListItem>
    );
};

export default LinkaItem;
