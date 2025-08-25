import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const ChangePassword = () => {

    const { user } = useAuthContext;
    const [passwordData, setPasswordData] = useState({
        current_pass: '',
        new_pass: '',
        confirm_pass: '',
    })

    const handleInputChange = (e) => {
        const {name , value} = e.target;
        setPasswordData((prev)=> ({...prev , [name]:value}))
    }

    return (
        <div>
            <h1>ChangePassword</h1>

            <form>
                <div>
                    <label>Current Password</label>
                    <input type="text"
                    
                    placeholder='Enter Current Password' />
                </div>
                <div>
                    <label>New Password</label>
                    <input type="text" placeholder='Enter New Password' />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="text" placeholder='Enter Confirm Password' />
                </div>
            </form>
        </div>
    )
}

export default ChangePassword