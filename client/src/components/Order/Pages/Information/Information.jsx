import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CheckIsActivePageContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import {SetOrderDataContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import {UserDataContext} from '../../../Contexts/ContextsUserData/ContextsUserData'
import { StyledMain as SM, StyledUser as SU, StyledDelivery as SD, StyledExtra as SE} from './StyledInformationPage'

const defaultValues = {
    name: "",
    surname: "",
    phone: "",
    email: "",
}

export default function Information () {

    const checkIsActivePage = useContext(CheckIsActivePageContext)
    const setOrderData = useContext(SetOrderDataContext)
    const userData = useContext(UserDataContext)
    const { register, reset, handleSubmit, formState: {errors, isValid} } = useForm({
        mode: "onChange",
        defaultValues: userData || {},
    })

    useEffect(() => {
        checkIsActivePage()
    }, [])

    useEffect(() => {
        if (userData) {
            const newValues = {...defaultValues, ...userData}
            reset(newValues)
        }
    }, [userData, reset])
    
    return (
        <>
            <SM.WrapperInformationPage>
                <SM.InformationPage>
                    <SM.InformationForm>
                        <UserInformation/>
                        <DeliveryType/>
                        <ExtraFields/>
                    </SM.InformationForm>
                </SM.InformationPage>
            </SM.WrapperInformationPage>
        </>
    )
}

function UserInformation () {
    return (
        <>
            <SU.UserInformationWrapper>
                <SU.UserInformationFields>
                    <SU.WrapperUserTitle>
                        <SU.Title>Your Information</SU.Title>
                    </SU.WrapperUserTitle>
                    <SU.WrapperUserFields>
                        <FormField 
                            label={'Name'} 
                            type={'text'} 
                            name={'name'}
                        />
                        <FormField 
                            label={'Surname'} 
                            type={'text'} 
                            name={'surname'}
                        />
                        <FormField 
                            label={'Phone'} 
                            type={'text'} 
                            name={'phone'}
                        />
                        <FormField 
                            label={'Email'} 
                            type={'email'} 
                            name={'email'}
                        />
                    </SU.WrapperUserFields>
                </SU.UserInformationFields>
            </SU.UserInformationWrapper>
        </>
    )
}

function FormField ({label, type, name}) {
    return (
        <>
            <SU.WrapperField>
                <SU.LabelField htmlFor={label}>{label}</SU.LabelField>
                <SU.Input id={label} name={name} type={type} autoComplete='off'/>
            </SU.WrapperField>
        </>
    )
}

function DeliveryType () {
    return (
        <>
            <SD.DeliveryTypeWrapper>
                <SD.DeliveryTypeFields>

                </SD.DeliveryTypeFields>
            </SD.DeliveryTypeWrapper>
        </>
    )
}

function ExtraFields () {
    return (
        <>
            <SE.ExtraFieldsWrapper>
                <SE.ExtraFieldsBlock>

                </SE.ExtraFieldsBlock>
            </SE.ExtraFieldsWrapper>
        </>
    )
}