import React, { useEffect, useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { getTeam } from '../../services/apiService'; // Import your api service
import { toast } from 'react-toastify';
import {useAuthContext} from '../../context/AuthContext'
const TeamTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useAuthContext();
  // Recursive function to transform API data to Primereact format
  const transformNode = (node) => ({
    type: 'person',
    className: 'bg-indigo-600 text-white',
    style: { borderRadius: '12px', padding: '10px', minWidth: '180px' },
    data: {
      name: node.name,
      title: `Referral Code: ${node.referral_code}`,
      phone: node.phone || 'No phone',
      email: node.email || 'No email',
    },
    children: node.children && node.children.length > 0 ? node.children.map(transformNode) : [],
  });

  useEffect(() => {
    const fetchTeam = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await getTeam(user/erId);
        if (res.status) {
          // The root node should be the user + their downline as children
          const rootNode = {
            type: 'person',
            className: 'bg-blue-700 text-white',
            style: { borderRadius: '12px', padding: '10px', minWidth: '220px' },
            data: {
              name: res.name,
              title: `Referral Code: ${res.referral_code}`,
              phone: 'N/A',
              email: 'N/A',
            },
            children: res.downline.map(transformNode),
          };
          setTreeData([rootNode]);
        } else {
          toast.error('Failed to load referral tree data');
        }
      } catch (err) {
        toast.error('Error fetching referral tree data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [userId]);

  // Node template for OrganizationChart
  const nodeTemplate = (node) => {
    const { name, title, phone, email } = node.data;
    return (
      <div className="flex flex-col items-center text-center p-3">
        <div className="font-semibold mb-1">{name}</div>
        <div className="text-sm mb-1">{title}</div>
        <div className="text-xs mb-1">📞 {phone}</div>
        <div className="text-xs">{email}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-600 font-semibold">
        Loading referral tree...
      </div>
    );
  }

  if (!treeData) {
    return (
      <div className="text-center text-red-600 font-semibold mt-4">
        No referral data to display
      </div>
    );
  }

  return (
    <div className="card flex-1 p-4" style={{ overflowX: 'auto' }}>
      <OrganizationChart
        value={treeData}
        nodeTemplate={nodeTemplate}
        collapsible
      />
    </div>
  );
};

export default TeamTree;
