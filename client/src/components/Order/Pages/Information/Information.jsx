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
    const [informationFormData, setInformationFormData] = useState(userData || {})
    const { register, reset, handleSubmit, formState: {errors, isValid} } = useForm({
        mode: "onChange",
        defaultValues: userData || {},
    })

    const inputsErrors = {
        name: {
            message: errors.name?.message || null
        },
        surname: {
            message: errors.surname?.message || null
        },
        phone: {
            message: errors.phone?.message || null
        },
        email: {
            message: errors.email?.message || null
        },
    }

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
                        <UserInformation
                            register={register}
                            inputsErrors={inputsErrors}
                            setInformationFormData={setInformationFormData}
                        />
                        <DeliveryType/>
                        <ExtraFields/>
                    </SM.InformationForm>
                </SM.InformationPage>
            </SM.WrapperInformationPage>
        </>
    )
}

function UserInformation ({register, inputsErrors, setInformationFormData}) {

    const handleOnChangeInformationFormData = (e) => {
        const {name, value} = e.target;
        setInformationFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

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
                            inputsErrors={inputsErrors}
                            register={register}
                            validationRules={{
                                required: 'This field must not be empty'
                            }}
                            onChange={handleOnChangeInformationFormData}
                        />
                        <FormField 
                            label={'Surname'} 
                            type={'text'} 
                            name={'surname'}
                            inputsErrors={inputsErrors}
                            register={register}
                            validationRules={{
                                required: 'This field must not be empty'
                            }}
                            onChange={handleOnChangeInformationFormData}
                        />
                        <FormField 
                            label={'Phone'} 
                            type={'text'} 
                            name={'phone'}
                            inputsErrors={inputsErrors}
                            register={register}
                            validationRules={{
                                required: 'This field must not be empty'
                            }}
                            onChange={handleOnChangeInformationFormData}
                        />
                        <FormField 
                            label={'Email'} 
                            type={'email'} 
                            name={'email'}
                            inputsErrors={inputsErrors}
                            register={register}
                            validationRules={{
                                required: 'Invalid email type',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email type',
                                },
                            }}
                            onChange={handleOnChangeInformationFormData}
                        />
                    </SU.WrapperUserFields>
                </SU.UserInformationFields>
            </SU.UserInformationWrapper>
        </>
    )
}

function FormField ({label, type, name, inputsErrors, register, validationRules, onChange}) {

    const fieldError = inputsErrors?.[name]?.message;

    const handleOnChange = (e) => {
        if (onChange) onChange(e)
    }

    return (
        <>
            <SU.WrapperField>
                <SU.LabelField htmlFor={label}>{label}</SU.LabelField>
                <SU.Input id={label} name={name} type={type} autoComplete='off'
                    {...register(name, {
                        ...validationRules,
                        onChange: (e) => handleOnChange(e)
                    })}
                />
                {fieldError && <SU.Span>{fieldError}</SU.Span>}
            </SU.WrapperField>
        </>
    )
}

function DeliveryType () {

    const [deliveryType, setDeliveryType] = useState(null)

    const handleOnChangeDeliveryType = (e) => {
        const type = e.target.value
        setDeliveryType((prev) => {type === deliveryType ? prev : type})
    }

    return (
        <>
            <SD.DeliveryTypeWrapper>
                <SD.DeliveryTypeFields>
                    <SD.WrapperTitle>
                        <SD.Title>Choose a delivery type</SD.Title>
                    </SD.WrapperTitle>
                    <SD.WrapperOptions>
                        <OptionType
                            type={'Delivery type 1'}
                            onChange={handleOnChangeDeliveryType}
                            value={'typeOne'}
                        />
                        <OptionType
                            type={'Delivery type 2'}
                            onChange={handleOnChangeDeliveryType}
                            value={'typeTwo'}
                        />  
                    </SD.WrapperOptions>
                </SD.DeliveryTypeFields>
            </SD.DeliveryTypeWrapper>
        </>
    )
}

function OptionType ({type, onChange, value}) {
    return (
        <>
            <SD.LabelWrapper>
                <SD.RadioInput value={value} id={value} onChange={(e) => onChange(e)} name='type' type='radio'/>
                <SD.RadioLabel htmlFor={value}>
                    <SD.Span>{type}</SD.Span>
                </SD.RadioLabel>
            </SD.LabelWrapper>
        </>
    )
}

function DeliveryMenu () {
    return (
        <>
            
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