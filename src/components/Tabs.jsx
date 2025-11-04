import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Tabs.css';

const Tabs = ({ defaultTab, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get all tab configurations from children
  const tabs = React.Children.map(children, (child) => ({
    id: child.props.tabId,
    label: child.props.label,
    element: child.props.element,
    condition:child.props.condition
  }))
  .filter(tab => tab.condition === undefined || tab.condition);

  //console.log('tabs:', tabs);

  // Get current tab from URL
  const getCurrentTab = () => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    const foundTab = tabs.find(tab => tab.id === lastPart);
    return foundTab ? foundTab.id : defaultTab;
  };

  const [activeTab, setActiveTab] = React.useState(getCurrentTab());

  // Sync with URL changes
  React.useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const pathParts = location.pathname.split('/');
    
    // Remove existing tab from path if present
    const lastPart = pathParts[pathParts.length - 1];
    if (tabs.some(tab => tab.id === lastPart)) {
      pathParts.pop();
    }
    
    // For default tab, don't add to URL
    if (tabId !== defaultTab) {
      pathParts.push(tabId);
    }
    
    navigate(pathParts.join('/'));
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.element}
      </div>
    </div>
  );
};

const Tab = ({ tabId, label, element }) => {
  // This component doesn't render anything itself
  // It just provides configuration to the parent Tabs component
  return null;
};

Tabs.Tab = Tab;

export default Tabs;