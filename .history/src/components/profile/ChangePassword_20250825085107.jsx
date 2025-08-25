import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

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

    const handleUpdatePass = async() => {
        e.preventdefault();

        if (passwordData.new_pass !== passwordData.confirm_pass) {
            toast.info("Please Enter same new Password");
            return;
        }

        if(!passwordData.current_pass || !passwordData.new_pass || !passwordData.confirm_pass){
            toast.error("Any field can not be Empty");
            return;
        }


        const updatedData = {
            current_password: passwordData.current_pass,
            new_password: passwordData.new_pass,
            confirm_password: passwordData.confirm_pass,
        }
        try {
            const response = await 
        } catch (error) {
            
        }
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
                        required
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
                        required
                        placeholder='Enter Confirm Password' />
                </div>

                <button type='submit'>Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword