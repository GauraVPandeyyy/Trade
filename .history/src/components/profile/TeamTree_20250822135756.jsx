import React, { useEffect, useState } from 'react';
import { getTeam } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import './TeamTree.css'; // We'll create this CSS file

const TeamTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  // Transform API data to a hierarchical structure
  const transformData = (data) => {
    if (!data) return null;
    
    const createNode = (userData) => ({
      id: userData.user_id,
      name: userData.name,
      referral_code: userData.referral_code || 'N/A',
      phone: userData.phone || 'N/A',
      email: userData.email || 'N/A',
      children: (userData.children || userData.downline || []).map(createNode)
    });
    
    return createNode(data);
  };

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await getTeam(user.user_id);
        if (res.status) {
          const transformedData = transformData(res);
          setTreeData(transformedData);
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

  // Recursive component to render the tree
  const TreeNode = ({ node, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(level < 2); // Expand first two levels by default
    
    const hasChildren = node.children && node.children.length > 0;
    
    return (
   
      <div className={`tree-node level-${level}`}>
        <div className="node-content">
          <div className="user-info">
            <div className="user-name">{node.name}</div>
            <div className="user-id">ID: {node.id}</div>
            <div className="referral-code">Ref: {node.referral_code}</div>
          </div>
          
          {hasChildren && (
            <button 
              className="expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="children-container">
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="team-tree-loading">
        <div className="loading-spinner"></div>
        <p>Loading referral tree...</p>
      </div>
    );
  }

  if (!treeData) {
    return (
      <div className="team-tree-empty">
        <p>No referral data to display</p>
      </div>
    );
  }

  return (
       <div className='flex-1'>
       </div>
    <div className="team-tree-container">
      
      <div className="team-tree">
        <TreeNode node={treeData} />
      </div>
    </div>
  );
};

export default TeamTree;