import styled from 'styled-components'

// Main Information Page

export const StyledMain = {
    WrapperInformationPage: styled.div``,
    InformationPage: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 20px 50px;`,
    InformationForm: styled.form`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    border: 1px solid red;`,
}

// UserInformation

export const StyledUser = {
    UserInformationWrapper: styled.div`
        padding: 10px;
        border: 1px solid blue;
    `,
    UserInformationFields: styled.div`
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    `,
    WrapperUserTitle: styled.div`
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `,
    Title: styled.h3`
        font-size: 21px;
        font-weight: 500;
    `,
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
    DeliveryTypeWrapper: styled.div``,
    DeliveryTypeFields: styled.div``,
}

// ExtraFields

export const StyledExtra = {
    ExtraFieldsWrapper: styled.div``,
    ExtraFieldsBlock: styled.div``,

}
