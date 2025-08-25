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
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }))
    }

    const handleUpdatePass = ()=>{
        e.preventdefault();

        const
    }

    return (
        <div>
            <h1>ChangePassword</h1>

            <form onSubmit={handleUpdatePass}>
                <div>
                    <label>Current Password</label>
                    <input type="text"
                        name='current_pass'
                        value={passwordData.current_pass}
                        onChange={handleInputChange}
                        placeholder='Enter Current Password' 
                        required
                        />
                </div>
                <div>
                    <label>New Password</label>
                    <input type="text"

                        name='new_pass'
                        value={passwordData.new_pass}
                        onChange={handleInputChange}
                        placeholder='Enter New Password' />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="text"
                        name='confirm_pass'
                        value={passwordData.confirm_pass}
                        onChange={handleInputChange}
                        placeholder='Enter Confirm Password' />
                </div>

                <button type='submit'>Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword