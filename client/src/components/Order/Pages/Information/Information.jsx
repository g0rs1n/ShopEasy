import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate} from 'react-router-dom'
import { CheckIsActivePageContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import { useOrderStore} from '../../../../store/orderStore/orderStore'
import {UserDataContext} from '../../../Contexts/ContextsUserData/ContextsUserData'
import { StyledMain as SM, StyledUser as SU, StyledDelivery as SD, StyledExtra as SE, MuiTypes as MUI} from './StyledInformationPage'
import { cityDb, deliveryDb } from '../../../../db/db'
import Select from 'react-select'
import Checkbox from '@mui/material/Checkbox';
import Textarea from '@mui/joy/Textarea';
import { FormControlLabel, FormControl, RadioGroup, Radio } from '@mui/material';

const defaultValues = {
    name: "",
    surname: "",
    phone: "",
    email: "",
}

export default function Information () {

    const checkIsActivePage = useContext(CheckIsActivePageContext)
    const userData = useContext(UserDataContext)
    const loadUserData = useOrderStore((state) => state.loadUserData)
    const checkExpiration = useOrderStore((state) => state.checkExpiration)
    const { register, reset, formState: {errors} } = useForm({
        mode: "onChange",
        defaultValues: userData || defaultValues,
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
        checkExpiration()
    }, [])

    useEffect(() => {
        if (userData) {
            loadUserData(userData)
            reset(userData)
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
                        />
                        <DeliveryType/>
                        <ExtraFields/>
                    </SM.InformationForm>
                </SM.InformationPage>
            </SM.WrapperInformationPage>
        </>
    )
}

function UserInformation ({register, inputsErrors}) {

    const orderData = useOrderStore((state) => state.orderData)
    const setOrderData = useOrderStore((state) => state.setOrderData)

    const handleOnChangeInformationFormData = (e) => {
        const {name, value} = e.target;
        setOrderData({[name]: value})
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
                            value={orderData.name || ""}
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
                            value={orderData.surname || ""}
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
                            value={orderData.phone || ""}
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
                            value={orderData.email || ""}
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

function FormField ({label, value, type, name, inputsErrors, register, validationRules, onChange}) {

    const fieldError = inputsErrors?.[name]?.message;

    const handleOnChange = (e) => {
        if (onChange) onChange(e)
    }

    return (
        <>
            <SU.WrapperField>
                <SU.LabelField htmlFor={label}>{label}</SU.LabelField>
                <SU.Input value={value} id={label} name={name} type={type} autoComplete='off'
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

    const types = [
        {value: "typeOne", label: "Delivery type 1"},
        {value: "typeTwo", label: "Delivery type 2"},
    ]
    const [cities, setCities] = useState(cityDb || [])
    const [departments, setDepartments] = useState(deliveryDb || [])
    const orderData = useOrderStore((state) => state.orderData)
    const setOrderData = useOrderStore((state) => state.setOrderData)

    useEffect(() => {
        if (cityDb) setCities(cityDb)
        if (deliveryDb) setDepartments(deliveryDb)
    }, [cityDb, deliveryDb])

    const handleOnChangeDeliveryType = (e) => {
        const type = e.target.value
        setOrderData({
            type: type,
            city: null,
            department: null,
        })
        const filteredDepartments = deliveryDb.filter((department) => department.type === type)
        setDepartments(filteredDepartments)
    }

    return (
        <>
            <SD.DeliveryTypeWrapper>
                <SD.DeliveryTypeFields>
                    <SD.WrapperTitle>
                        <SD.Title>Choose a delivery type</SD.Title>
                    </SD.WrapperTitle>
                    <FormControl>
                        <RadioGroup
                            value={orderData.type || null}
                            onChange={handleOnChangeDeliveryType}
                        >
                           {
                                types.map(({value, label}) => (
                                    <div key={value}>
                                        <FormControlLabel
                                            value={value}
                                            control={<Radio
                                                sx={MUI.radioStyles}
                                            />}
                                            label={label}
                                            sx={MUI.labelStyles}
                                        />
                                        {orderData.type === value && <DeliveryMenu cities={cities} departments={departments}/>}
                                    </div>
                                ))
                            } 
                        </RadioGroup>
                    </FormControl>
                </SD.DeliveryTypeFields>
            </SD.DeliveryTypeWrapper>
        </>
    )
}

function DeliveryMenu ({cities, departments}) {

    const [departmentOptions, setDepartmentOptions] = useState([])
    const orderData = useOrderStore((state) => state.orderData)
    const setOrderData = useOrderStore((state) => state.setOrderData)
    const cityOptions = cities.map((city) => ({value: city, label: city}))
    
    useEffect(() => {
        if (orderData.city) {
            const filteredDepartments = departments
                .filter((department) => department.city === orderData.city)
                .map((department) => ({
                    value: department.department, 
                    label: department.department
                }))
            setDepartmentOptions(filteredDepartments)
            
        } else {
            setDepartmentOptions([])
        }
    }, [orderData.city, departments])

    const handleOnChangeCity = (selectedOption) => {
        setOrderData({
            city: selectedOption ? selectedOption.value : null,
            department: null
        })
    }
    const handleOnChangeDepartments = (selectedOption) => {
        setOrderData({department: selectedOption ? selectedOption.value : null})
    }

    return (
        <>
            <SD.MenuWrapper>
                <SD.Menu>
                    <SD.MenuTitle>Select a city</SD.MenuTitle>
                    <Select
                        className='menu-select'
                        value={orderData.city ? { value: orderData.city, label: orderData.city } : null}
                        onChange={handleOnChangeCity}
                        options={cityOptions}
                        placeholder={"Select a city..."}
                        isSearchable
                        isClearable
                        menuPortalTarget={document.body}
                        styles={{
                            container: (base) => ({
                                ...base,
                                maxWidth: "500px",
                            }),
                        }}
                    />
                    <SD.MenuTitle>Select a department</SD.MenuTitle>
                    <Select
                        className='menu-select'
                        value={orderData.department ? { value: orderData.department, label: orderData.department } : null}
                        onChange={handleOnChangeDepartments}
                        options={departmentOptions}
                        placeholder={"Select a department..."}
                        isClearable
                        isSearchable
                        isDisabled={!orderData.city}
                        menuPortalTarget={document.body}
                        styles={{
                            container: (base) => ({
                                ...base,
                                maxWidth: "500px",
                            }),
                        }}
                    />
                </SD.Menu>
            </SD.MenuWrapper>
        </>
    )
}

function ExtraFields () {

    const userData = useContext(UserDataContext)
    const orderData = useOrderStore((state) => state.orderData)
    const setOrderData = useOrderStore((state) => state.setOrderData)
    const navigate = useNavigate()
    
    const handleOnChangeCheckbox = (e) => {
        const value = e.target.checked
        setOrderData({doNotCallBack: value})
    }

    const handleOnChangeComment = (e) => {
        const value = e.target.value
        setOrderData({comment: value})
    }

    const handleOnClickContinueButton = (e,page) => {
        e.preventDefault()
        const basePath = Object.keys(userData).length === 0 ? '/order' : '/app/order'
        navigate(`${basePath}/${page}`)
    }

    return (
        <>
            <SE.ExtraFieldsWrapper>
                <SE.ExtraFieldsBlock>
                    <FormControlLabel
                        control={<Checkbox 
                            checked={orderData.doNotCallBack || true} 
                            onChange={handleOnChangeCheckbox}
                            sx={MUI.checkboxStyles}
                        />}
                        label="Do not call back to confirm the order"
                        sx={MUI.labelStyles}
                    />
                    <SE.TextAreaWrapper>
                        <SE.Title>Your wishes or comments about the order</SE.Title>
                        <Textarea
                            minRows={3}
                            maxRows={5}
                            size='md'
                            value={orderData.comment || ""}
                            onChange={handleOnChangeComment}
                            sx={MUI.textareaStyles}
                        />
                        <SE.Button onClick={(e) => handleOnClickContinueButton(e,'payment')}>Continue</SE.Button>
                    </SE.TextAreaWrapper>
                </SE.ExtraFieldsBlock>
            </SE.ExtraFieldsWrapper>
        </>
    )
}