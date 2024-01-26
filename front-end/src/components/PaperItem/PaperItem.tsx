import {Paper, styled} from "@mui/material";

export const PaperItem = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    height: 45,
    lineHeight: "45px",
    width: "40%",
    marginTop: "10px",
    paddingLeft: "15px"
}));