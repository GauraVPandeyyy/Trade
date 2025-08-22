import React, { useEffect, useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { Tooltip } from 'primereact/tooltip';
import { getTeam } from '../../services/apiService'; // Your API service
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';

const TeamTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  // Recursive transform to handle both children and downline arrays for nested referrals
  const transformNode = (node) => ({
    type: 'person',
    className: 'bg-indigo-600 text-white',
    style: { borderRadius: '12px', padding: '10px', minWidth: '140px' },
    data: {
      userId: node.user_id,
      name: node.name,
      referral_code: node.referral_code || 'N/A',
      phone: node.phone || 'N/A',
      email: node.email || 'N/A',
    },
    children: (node.children || node.downline || []).length > 0
      ? (node.children || node.downline).map(transformNode)
      : [],
  });

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await getTeam(user.user_id);
        if (res.status) {
          console.log("get team", res);
          // Root node (current user) with their full downline
          const rootNode = {
            type: 'person',
            className: 'bg-blue-700 text-white',
            style: { borderRadius: '12px', padding: '10px', minWidth: '180px' },
            data: {
              userId: res.user_id,
              name: res.name,
              referral_code: res.referral_code,
              phone: 'N/A',
              email: 'N/A',
            },
            children: res.downline ? res.downline.map(transformNode) : [],
          };
          setTreeData(rootNode);
          console.log(treeData);{
        } else {
          toast.error('Failed to load referral tree data');
        }
      } catch (error) {
        toast.error('Error fetching referral tree data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [user?.user_id]);

  // Node template showing only userId and name, full info in tooltip on hover
  const nodeTemplate = (node) => {
    const { userId, name, referral_code, phone, email } = node.data;
    const tooltipId = `tooltip_${userId}`;

    return (
      <>
        <div
          data-pr-tooltip={`Referral Code: ${referral_code}\nPhone: ${phone}\nEmail: ${email}`}
          data-pr-position="right"
          data-pr-at="right+10 center"
          id={tooltipId}
          style={{ cursor: 'pointer' }}
          className="flex flex-col items-center text-center p-3 select-none"
        >
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-200">ID: {userId}</div>
        </div>
        <Tooltip target={`#${tooltipId}`} />
      </>
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
      <OrganizationChart value={treeData} nodeTemplate={nodeTemplate} collapsible />
    </div>
  );
};

export default TeamTree;
