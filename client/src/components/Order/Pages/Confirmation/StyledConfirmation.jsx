import styled from "styled-components";

const BaseWrapperStyles = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
`

const WrapperTitleBaseStyles = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export const StyledConfirmation = {
    WrapperConfirmation: styled(BaseWrapperStyles)`
        padding: 20px;
        row-gap: 20px;
        height: 100%;
    `,
    ConfirmationPage: styled.div`
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        border: 2px solid rgba(188, 186, 186, 0.96);
        width: 100%;
        max-width: 800px;
    `,
    WrapperTitle: styled(WrapperTitleBaseStyles)`
        padding: 20px 50px;
        border-bottom: 2px solid rgba(188, 186, 186, 0.96);
    `,
    Title: styled.h3`
        font-size: 21px;
        font-weight: 500;
    `,
    WrapperItemTitle: styled(WrapperTitleBaseStyles)`
    `,
    ItemTitle: styled.h3`
        font-size: 17px;
        font-weight: 500;
    `,
    WrapperProducts: styled(BaseWrapperStyles)`
        padding: 10px 50px;
        border-bottom: 2px solid rgba(188, 186, 186, 0.96);
    `,
    WrapperProductsItem: styled.div``,
    ProductsItem: styled(WrapperTitleBaseStyles)`
        justify-content: space-between;
        column-gap: 10px;
    `,
    ProductTitle: styled(WrapperTitleBaseStyles)`
        max-width: 500px;
    `,  
    TitleProduct: styled.h3`
        font-size: 18px;
    `,
    ProductInfo: styled.div`
        display: flex;
        align-items: center;
        column-gap: 15px;
    `,
    Quantity: styled.p``,
    Price: styled.p`
        font-size: 17px;
        font-weight: 500;
    `,
    DeliveryWrapper: styled.div`
        padding: 10px 50px;
        border-bottom: 2px solid rgba(188, 186, 186, 0.96);
    `,
    Delivery: styled(BaseWrapperStyles)`
    `,
    WrapperFields: styled.ul`
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    `,
    WrapperPayment: styled.div`
        padding: 10px 50px;
        border-bottom: 2px solid rgba(188, 186, 186, 0.96);
    `,
    Payment: styled(BaseWrapperStyles)`
    `,
    WrapperTotal: styled.div`
        padding: 10px 50px;
    `,
    Total: styled.div``,
    WrapperTotalSum: styled.div`
        display: flex;
        align-items: center;
        column-gap: 20px;
    `,
    TotalTitle: styled.h3`
        font-size: 17px;
    `,
    TotalSum: styled.div`
        font-size: 17px;
        font-weight: 500;
    `,
    WrapperButton: styled.div``,
    Button: styled.button`
        padding: 12px 10px;
        border: 1px solid #1477cd;
        background-color: #1477cd;
        color: #fff;
        border-radius: 12px;

        &:disabled {
            opacity: 0.5;
        }

        &:hover{
            transition: 0.3s;
            border: 1px solid #3a9fd6;
            background-color: #3a9fd6;
        }
    `,
    SpinnerWrapper: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100dvh;
    `,
}