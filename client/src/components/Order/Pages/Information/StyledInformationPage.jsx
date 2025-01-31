import styled from 'styled-components'
import { theme } from '../../../../styles/theme'

// BaseStyles

const FieldsWrapperBase = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`
const WrapperTitleBase = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const TitleBase = styled.h3`
    font-size: 21px;
    font-weight: 500;
`

// Main Information Page

export const StyledMain = {
    WrapperInformationPage: styled.div``,
    InformationPage: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px 50px;
    `,
    InformationForm: styled.form`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;`,
}

// UserInformation

export const StyledUser = {
    UserInformationWrapper: styled.div`
        padding: 10px;
    `,
    UserInformationFields: styled(FieldsWrapperBase)``,
    WrapperUserTitle: styled(WrapperTitleBase)``,
    Title: styled(TitleBase)``,
    WrapperUserFields: styled.div`
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    `,
    WrapperField: styled.div`
        display: flex;
        flex-direction: column;
        row-gap: 6px;
        align-items: flex-start;
        
    `,
    LabelField: styled.label``,
    Input: styled.input`
        max-width: 250px;
        border-radius: 3px;
        border: 1px solid rgb(216, 210, 210);
        background-color:rgb(216, 210, 210);
        padding: 1px 1px;

        &:focus{
            border: 1px solid rgba(123, 123, 123, 1.0);
        }
    `,
    Span: styled.span`
        font-size: 12px;
        font-weight: 500;
        color: red;
    `,
}

// DeliveryType

export const StyledDelivery = {
    DeliveryTypeWrapper: styled.div`
        padding: 10px;
    `,
    DeliveryTypeFields: styled(FieldsWrapperBase)``,
    WrapperTitle: styled(WrapperTitleBase)``,
    Title: styled(TitleBase)``,
    WrapperOptions: styled(FieldsWrapperBase)`
        row-gap: 15px;
    `,
    LabelWrapper: styled.label`
        display: flex;
        align-items: center;
        column-gap: 10px;
    `,
    RadioInput: styled.input`
        display: none; 
  
        &:checked + label::before {
            background-color: #1477cd;
        }
    `,
    RadioLabel: styled.label`
        display: flex;
        align-items: center;
        column-gap: 10px;
        cursor: pointer;

        &::before {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: white;
            border: 2px solid rgb(201, 198, 198);
            transition: background-color 0.3s ease, border 0.3s ease;
        }
    `,
    Span: styled.span``,
    MenuWrapper: styled.div`
        margin-left: 30px;
        border-radius: 10px;
        border: 2px solid rgba(188, 186, 186, 0.96);
        max-width: 500px;
    `,
    Menu: styled.div`
        padding: 10px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    `,
    MenuTitle: styled.h3`
        font-weight: 500;
    `,
    MenuFieldSelect: styled.select``,
    MenuFieldOption: styled.option``,
}

export const radioStyles = {
    color: "rgba(148, 143, 143, 0.96)",
    "&.Mui-checked": {
        color: `${theme.color.accent}`
    }
}

export const labelStyles = {

}


// ExtraFields

export const StyledExtra = {
    ExtraFieldsWrapper: styled.div`
        padding: 10px;
    `,
    ExtraFieldsBlock: styled(FieldsWrapperBase)`
        row-gap: 6px;
    `,
    TextAreaWrapper: styled(FieldsWrapperBase)`
        row-gap: 15px;
    `,
    Title: styled.h3`
        font-size: 17px;
        font-weight: 500;
    `,
    Button: styled.button`
        padding: 12px 10px;
        border: 1px solid #1477cd;
        background-color: #1477cd;
        color: #fff;
        max-width: 100px;
        border-radius: 12px;

        &:hover{
            transition: 0.3s;
            border: 1px solid #3a9fd6;
            background-color: #3a9fd6;
        }
    `,
}

// None StyledComponents Styles

// Mui Types

export const MuiTypes = {
    // Delivery Type Styles
    radioStyles: {
        color: "rgba(148, 143, 143, 0.96)",
        "&.Mui-checked": {
            color: theme.color.accent
        }
    },
    labelStyles: {
        "& .MuiFormControlLabel-label": {
            fontFamily: theme.font.main,
            fontSize: '17px'
        } 
    },
    // Extra Fields 
    checkboxStyles: {
        '& .MuiSvgIcon-root': { 
            fontSize: 22,
        },
        color: 'rgba(148, 143, 143, 0.96)',
        '&.Mui-checked': {
            color: theme.color.accent,
        },
    },
    textareaStyles: {
        maxWidth: '460px',
        '--Textarea-focusedHighlight': `${theme.color.accent} !important`,
    },
}