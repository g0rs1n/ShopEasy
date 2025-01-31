import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const StyledPayment = {
    WrapperPayment: styled.div``,
    Payment: styled.div`
        display: flex;
        flex-direction: column;
        row-gap: 25px;
        padding: 20px 50px;
    `,
    WrapperButton: styled.div`
        display: flex;
        justify-content: flex-start;
    `,
    Button: styled.button`
        padding: 12px 10px;
        border: 1px solid #1477cd;
        background-color: #1477cd;
        color: #fff;
        border-radius: 12px;

        &:hover{
            transition: 0.3s;
            border: 1px solid #3a9fd6;
            background-color: #3a9fd6;
        }
    `
}

// None StyledComponents Styles

// Mui Styles

export const MuiStyles = {
    LabelStyles: {
        "& .MuiFormControlLabel-label": {
            fontFamily: theme.font.main,
            fontSize: '17px'
        } 
    },
    RadioStyles: {
        color: "rgba(148, 143, 143, 0.96)",
        "&.Mui-checked": {
            color: theme.color.accent
        }
    },
}