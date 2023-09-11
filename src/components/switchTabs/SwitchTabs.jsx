import React, { useState } from 'react';
import "./style.scss";

const SwitchTabs = ({data, onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    //Based on every index it will multiply
    //Ex - 0*100, 1*100 will remain same after switching
    setLeft(index * 100);
    setTimeout(() => {
        setSelectedTab(index);
    }, 300);
    onTabChange(tab, index)
  }

  return (
    <div className="switchingTabs">
        <div className="tabItems">
            {data.map((tab, index)=> (
                <span 
                    key={index} 
                    className={`tabItem ${selectedTab === index ? "active" : ""}`}
                    onClick={()=> activeTab(tab, index)}
                >
                    {tab}
                </span>
            ))}
            <span className='movingBg' style={{left}} />
        </div>
    </div>
  )
}

export default SwitchTabs