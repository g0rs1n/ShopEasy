import styled from 'styled-components'
import { theme } from '../../../styles/theme'

const UserPageLayout = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-item: flex-start;
    justify-content: center;
`
const TitleButtonLayout = styled.div`
    display: flex;
    justify-content: flex-start;
    align-item: center;
`

export const WrapperUserPage = styled(UserPageLayout)`
    row-gap: 20px;
`

export const UserPageTitle = styled(TitleButtonLayout)`
`

export const Title = styled.h3`
    font-weight: 500;
    font-size: 23px;
`
const UserDataLayout = styled.p`
`

export const UserEmail = styled(UserDataLayout)``

export const UserName = styled(UserDataLayout)``

export const UserPhone = styled(UserDataLayout)``

export const ChangeButton = styled.button`
    padding: 9px 15px;
    text-align: center;
    border-radius: 12px;
    color: #fff;
    border: 1px solid ${theme.color.accent};
    background-color: ${theme.color.accent};

    &:hover{
        border: 1px solid rgb(49, 148, 202);
        background-color: rgb(49, 148, 202);
        transition: 0.4s;
    }
`

export const UserPage = styled(UserPageLayout)`
    row-gap: 13px;
`

export const UserPageButton = styled(TitleButtonLayout)`
`

export const InputChange = styled.input`
    padding: 2px 5px;
    border-radius: 3px;
    border: 1px solid rgb(204, 204, 204);
    background-color:rgb(204, 204, 204);

    &:focus{
        border: 1px solid rgba(123, 123, 123, 1.0);
    }
`

export const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;      
    width: 100%;
`