import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { bankDetails, getUser } from '../../services/apiService';
import { 
  Card, 
  TextField, 
  Button, 
  LoadingIndicator, 
  Validation, 
  InfoIcon, 
  PencilIcon, 
  LockIcon 
} from 'lucid-ui';
import { toast } from 'react-toastify';

const BankDetails = () => {
  const { user } = useAuthContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [form, setForm] = useState({
    user_id: "",
    bank_name: "",
    branch: "",
    account_number: "",
    account_holder: "",
    ifsc_code: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await getUser(user.user_id);
        setForm({
          user_id: data.user_id || "",
          bank_name: data.bank_name || "",
          branch: data.branch || "",
          account_number: data.account_number || "",
          account_holder: data.name || data.account_holder || "",
          ifsc_code: data.ifsc_code || "",
        });
      } catch {
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    if (user?.user_id) fetchUserData();
  }, [user]);

  const handleChange = (value, { event, props }) => {
    if (isDisabled) return;
    const { name } = props;
    setForm(prev => ({
      ...prev, [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.account_holder) newErrors.account_holder = 'Account holder name required';
    if (!form.account_number) newErrors.account_number = 'Account number required';
    if (!form.bank_name) newErrors.bank_name = 'Bank name required';
    if (!form.branch) newErrors.branch = 'Branch required';
    if (!form.ifsc_code) newErrors.ifsc_code = 'IFSC code required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (isDisabled) {
      toast.error("Please click 'Edit' first");
      return;
    }
    if (!validate()) {
      toast.error("All fields are mandatory.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await bankDetails(form);
      if (res.status) {
        toast.success(res.message || "Bank details updated successfully!");
        setIsDisabled(true);
      } else {
        toast.error(res.message || "Update failed.");
      }
    } catch (error) {
      toast.error(error.message || "API Error: Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 540, margin: '2rem auto' }}>
      <Card style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.07)' }}>
        <Card.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <InfoIcon size={28} style={{ color: '#0a41af' }} />
            <span className="lucid-Heading lucid-Heading--size-4">Bank Details</span>
          </div>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            background: isDisabled ? '#eee' : '#eef7ff',
            color: isDisabled ? '#57606f' : '#1b72bb',
            borderRadius: 16,
            padding: '4px 12px',
            fontSize: 14
          }}>
            {isDisabled ? <LockIcon size={16} /> : <PencilIcon size={16} />} 
            {isDisabled ? 'Locked' : 'Editing'}
          </span>
        </Card.Header>
        <Card.Text>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <LoadingIndicator />
            </div>
          ) : (
            <form onSubmit={SubmitHandler} style={{ marginTop: 20 }}>
              <div style={{ display: 'grid', gap: 22 }}>
                <TextField
                  label="Account Holder Name"
                  name="account_holder"
                  placeholder="Enter account holder's name"
                  value={form.account_holder}
                  onChange={handleChange}
                  isDisabled={isDisabled}
                  Error={errors.account_holder && (
                    <Validation type="error">{errors.account_holder}</Validation>
                  )}
                />
                <TextField
                  label="Account Number"
                  name="account_number"
                  placeholder="Enter account number"
                  value={form.account_number}
                  onChange={handleChange}
                  isDisabled={isDisabled}
                  Error={errors.account_number && (
                    <Validation type="error">{errors.account_number}</Validation>
                  )}
                />
                <TextField
                  label="Bank Name"
                  name="bank_name"
                  placeholder="Enter bank name"
                  value={form.bank_name}
                  onChange={handleChange}
                  isDisabled={isDisabled}
                  Error={errors.bank_name && (
                    <Validation type="error">{errors.bank_name}</Validation>
                  )}
                />
                <TextField
                  label="Branch Name"
                  name="branch"
                  placeholder="Enter branch name"
                  value={form.branch}
                  onChange={handleChange}
                  isDisabled={isDisabled}
                  Error={errors.branch && (
                    <Validation type="error">{errors.branch}</Validation>
                  )}
                />
                <TextField
                  label="IFSC Code"
                  name="ifsc_code"
                  placeholder="Enter IFSC code"
                  value={form.ifsc_code}
                  onChange={handleChange}
                  isDisabled={isDisabled}
                  Error={errors.ifsc_code && (
                    <Validation type="error">{errors.ifsc_code}</Validation>
                  )}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                <Button
                  isDisabled={!isDisabled}
                  onClick={() => setIsDisabled(false)}
                  kind="primary"
                  style={{ minWidth: 120, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <PencilIcon size={18} /> Edit
                </Button>
                <Button
                  type="submit"
                  isDisabled={submitting || isDisabled}
                  kind="success"
                  style={{ minWidth: 120, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  {submitting && <LoadingIndicator size={18} style={{ marginRight: 8 }} />}
                  Save
                </Button>
              </div>
            </form>
          )}
        </Card.Text>
      </Card>
    </div>
  );
};

export default BankDetails;
