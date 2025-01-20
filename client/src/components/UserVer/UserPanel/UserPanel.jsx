import { useState,useContext, useEffect } from 'react';
import { UserDataContext, SetUserDataContext } from '../../Contexts/ContextsUserData/ContextsUserData'
import {
    WrapperUserPage,UserPageTitle,Title,UserPage,UserEmail,UserName,UserPhone,
    UserPageButton,ChangeButton,InputChange,SpinnerWrapper
} from './StyledUserPanel'
import {SyncLoader} from 'react-spinners'
import "./UserPanel.scss"
import axios from 'axios'

export default function UserPanel () {

    const [currentTab, setCurrentTab] = useState(0)
    const tabsItem = [
        'Your Profile',
        'Order History'
    ]

    return (
        <>
            <div className='wrapper-userpanel'>
                <div className='userpanel'>
                    <ul className='wrapper-tabs'>
                        {
                            tabsItem.map((item, index) => {
                                return (
                                    <TabsItem 
                                        key={item}
                                        itemName={item}
                                        index={index}
                                        currentTab={currentTab}
                                        setCurrentTab={setCurrentTab}
                                    />
                                )
                            })
                        }
                    </ul>
                    <div className='wrapper-tabs-content'>
                        {currentTab === 0 && <TabsContentOne/>}
                        {currentTab === 1 && <TabsContentTwo/>}
                    </div>
                </div>
            </div>
        </>
    )
}

function TabsItem ({itemName, index, currentTab, setCurrentTab}) {

    return (
        <>
            <li onClick={() => {setCurrentTab(index)}} className={`${currentTab === index ? 'tabs-item active-tab' : 'tabs-item'}`}>
                {itemName}
            </li>
        </>
    )
}

function TabsContentOne () {

    const [isLoading, setIsLoading] = useState(true)
    const userData = useContext(UserDataContext)
    const setUserData = useContext(SetUserDataContext)
    const [editButton, setEditButton] = useState(true)
    const [editUserData, setEditUserData] = useState({})
    
    useEffect(() => {
        if(userData){
            setEditUserData(userData)
            setIsLoading(false)
        }
    },[userData])

    const toggleEditMode = () => {
        setEditButton(!editButton)
    }

    const handleChangeUser = (e) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value
        })
    }

    const updateUserData = async () => {
        try {

            const response = await axios.patch('http://localhost:5001/api/users/me/profile',editUserData,{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (response.status === 200) {
                setUserData(response.data.updatedUser)
            }
        } catch (error) {
            if (error.response) {
                const errorStatus = error.response.status
                const errorMsg = error.response.data.error || 'Unknown error'
                console.error(errorStatus, errorMsg)
            } else if (error.request) {
                console.error("The request was sent, but no response was received", error.request)
            } else {
                console.error("Error: patch userPanelData", error)
            }
        }
    }

    const handleEditButtonClick = () => {
        if (!editButton) {
            updateUserData()
        }
        toggleEditMode()
    }

    if (isLoading) {
        return (
            <>
                <SpinnerWrapper>
                    <SyncLoader
                        color={'#1477cd'}
                        margin={2}
                        loading={isLoading}
                        size={15}
                        speedMultiplier={1}
                    />
                </SpinnerWrapper>
            </>
        )
    }

    return (
        <>
            <WrapperUserPage>
                <UserPageTitle>
                    <Title>Information</Title>
                </UserPageTitle>
                <UserPage>
                    <UserName>Name: {!editButton ? <InputChange onChange={handleChangeUser} name='name' value={editUserData.name || ''} type='text'/> : editUserData.name}</UserName>
                    <UserEmail>Email: {!editButton ? <InputChange onChange={handleChangeUser} value={editUserData.email || ''} name='email' type='email'/> : editUserData.email}</UserEmail>
                    <UserPhone>Phone: {!editButton ? <InputChange onChange={handleChangeUser} value={editUserData.phone || ''} name='phone' type='text'/> : editUserData.phone || 'Phone is not available'}</UserPhone>
                </UserPage>
                <UserPageButton>
                    <ChangeButton onClick={handleEditButtonClick}>{editButton ? 'Edit' : 'Save'}</ChangeButton>
                </UserPageButton>
            </WrapperUserPage>  
        </>
    )
}

function TabsContentTwo () {
    return (
        <>
        
        </>
    )
}