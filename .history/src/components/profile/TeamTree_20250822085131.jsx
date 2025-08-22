import React, { useEffect, useState, useRef } from 'react';
import Tree from 'react-d3-tree';
import { toast } from 'react-toastify';

const apiUrl = 'https://newadmin.gamedemo.tech/api/downline';

// Normalize API data to react-d3-tree format
const normalizeData = (data) => ({
  name: `${data.name} (${data.referral_code})`,
  attributes: {
    userId: data.user_id,
    phone: data.phone || 'N/A',
    email: data.email || 'N/A',
  },
  children: (data.downline || data.children || []).map(normalizeData),
});

const NodeLabel = ({ nodeData }) => {
  const { name, attributes } = nodeData;

  return (
    <div
      style={{
        padding: '8px 12px',
        borderRadius: 6,
        backgroundColor: '#f0f4f8',
        border: '1px solid #ccc',
        maxWidth: 220,
        fontSize: 12,
        color: '#333',
      }}
    >
      <div><strong>{name}</strong></div>
      {attributes && (
        <>
          <div>User ID: {attributes.userId}</div>
          <div>Phone: {attributes.phone}</div>
          <div>Email: {attributes.email}</div>
        </>
      )}
    </div>
  );
};

const ReferralTree = ({ userId }) => {
  const [treeData, setTreeData] = useState(null);
  const treeContainerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTree = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/${userId}`);
        const data = await response.json();

        if (data.status) {
          // Normalize root data: use downline as children
          const normalized = normalizeData({
            ...data,
            children: data.downline,
          });

          setTreeData(normalized);
        } else {
          toast.error("Failed to load referral tree data");
        }
      } catch (err) {
        toast.error("Error fetching referral tree");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTree();
    }
  }, [userId]);

  // Calculate center for initial tree translation
  useEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 60,
      });
    }
  }, [treeData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading referral tree...</div>
      </div>
    );
  }

  if (!treeData) {
    return <div className="text-center text-red-500">No referral data available.</div>;
  }

  return (
    <div
      ref={treeContainerRef}
      style={{ width: '100%', height: '70vh', border: '1px solid #ddd', borderRadius: 8, overflow: 'auto' }}
      className="bg-white p-4"
    >
      <Tree
        data={treeData}
        translate={translate}
        orientation="vertical"
        pathFunc="elbow"
        collapsible={true}
        zoomable={true}
        initialDepth={2}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        renderCustomNodeElement={({ nodeDatum }) => <NodeLabel nodeData={nodeDatum} />}
        styles={{
          links: {
            stroke: '#aaa',
            strokeWidth: 1.5,
          },
        }}
      />
    </div>
  );
};

export default ReferralTree;
