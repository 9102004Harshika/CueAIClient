import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line ,CartesianGrid} from 'recharts';
import { format } from 'date-fns'; // For date formatting

export const UserAnalytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    retention: 0,
    distribution: [],
    deviceCounts: {},
    userActivity: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get('http://localhost:5000/admin/getStats');
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, []);

  const inactiveUsers = stats.totalUsers - stats.activeUsers;

  // Data for Stacked BarChart
  const userData = [
    { name: 'Users', Total: stats.totalUsers, Active: stats.activeUsers, Inactive: inactiveUsers },
  ];

  // Aggregate data for PieChart
  const aggregateData = () => {
    return [
      { name: 'Inactive Users', value: stats.totalUsers - stats.activeUsers },
      { name: 'Active Users', value: stats.activeUsers },
    ];
  };

  const distributionData = () => {
    return stats.distribution.map((entry, index) => ({
      name: `${entry.location.country || 'Unknown Country'}, ${entry.location.region || 'Unknown Region'}`,
      value: entry.count,
    }));
  };

  const deviceData = () => {
    return [
      { name: 'Mobile', Devices: stats.deviceCounts.mobile },
      { name: 'Tablet', Devices: stats.deviceCounts.tablet },
      { name: 'Desktop', Devices: stats.deviceCounts.desktop },
      { name: 'Laptop', Devices: stats.deviceCounts.laptop }
    ];
  };

  // Data for Retention LineChart
  const retentionData = [
    { name: 'Retention Rate', Retention: stats.retention },
  ];

  // Data for user activity bar chart

  const dayOfWeekMap = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday'
};

// Transform data and map numeric dayOfWeek to day names
const activityData = stats.userActivity.map(activity => ({
    dayOfWeek: dayOfWeekMap[activity._id.dayOfWeek],
    hour: activity._id.hour,
    count: activity.count
}));
  const COLORS = ['rgb(219, 194, 144)', 'rgb(218,177,141)', 'rgb(217,171,140)', 'rgb(216,160,138)', 'rgb(215,142,136)', 'rgb(214, 133, 134)'];


  return (
    <>
      <div className="flex gap-10">
        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-5 rounded-lg">
        <h2 className='ml-3 text-2xl '>No of Active Users</h2>
        <p className="text-sm text-gray-400 ml-3 mb-5">Proportion of active and inactive users.</p>
          <ResponsiveContainer width="80%" height="75%">
            <PieChart
              width={60}
              height={60}
              margin={{
                top: -10,
                right: -10,
                left: 10,
                bottom: 0,
              }}
            >
              <Pie
                data={aggregateData()}
                outerRadius={75}
                paddingAngle={2}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {aggregateData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-5 rounded-lg">
          <h2 className='ml-3 text-2xl '>Types of Users</h2>
          <p className="text-sm text-gray-400 ml-3 mb-5">Types of users using the site.</p>
          <ResponsiveContainer width="85%" height="75%">
            <BarChart data={userData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total" stackId="a" fill={COLORS[0]} />
              <Bar dataKey="Active" stackId="a" fill={COLORS[4]} />
              <Bar dataKey="Inactive" stackId="a" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
         <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
        <h2 className='ml-3 text-2xl '>Retention Rate</h2>
        <p className="text-sm text-gray-400 text-center mb-5">Retention rate is the number of users returning back to the site.</p>
        <ResponsiveContainer width="85%" height="75%">
          <LineChart data={retentionData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Retention" stroke={COLORS[3]} 
            dot={{ stroke: 'rgb(219, 194, 144)', fill: 'rgb(219, 194, 144)' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
     <div className='flex gap-10'> 
     <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
         <h2 className='ml-3 text-2xl '>Geographical distribution</h2>
        <p className="text-sm text-gray-400 ml-3  ">Percentage of users from different locations.</p>
        <ResponsiveContainer width="85%" height="85%">
          <PieChart
          >
            <Pie data={distributionData()} outerRadius={70} fill="#82ca9d" label>
              {distributionData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
     
      <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
      <h2 className='ml-3 text-2xl '>Types of Devices</h2>
      <p className="text-sm text-gray-400 ml-3 mb-5">Percentage of users using site from different devices.</p>
        <ResponsiveContainer width="85%" height="75%">
          <BarChart data={deviceData()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Devices" fill={COLORS[3]}>
              {deviceData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[3]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
      <h2 className='ml-3 text-2xl '>User Activity Over Time</h2>
      <p className="text-sm text-gray-400 ml-3 mb-5">User activity metrics with respect to days of week.</p>
        <ResponsiveContainer width="85%" height="75%">
          <BarChart data={activityData}>
          <XAxis dataKey="dayOfWeek" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={COLORS[5]}/>
          </BarChart>
        </ResponsiveContainer>
      </div></div>
    </>
  );
};

export const PromptsAnalytics = () => {
  const [stats, setStats] = useState({
    totalPrompts: 0,
    activePrompts: 0,
    categoryDistribution: [],
    monthlyPrompts: [],
    promptStatusCounts: [],
    deviceUsage: [], // New data
    conversionFunnel: [], // New data
    userActivity: [] // New data
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get('http://localhost:5000/admin/getPromptStats');
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching prompt stats:', error);
      }
    };

    fetchData();
  }, []);

  // Data for PieChart
  const aggregateData = () => {
    return [
      { name: 'Inactive Prompts', value: stats.totalPrompts - stats.activePrompts },
      { name: 'Active Prompts', value: stats.activePrompts },
    ];
  };

  const categoryData = stats.categoryDistribution.map((entry, index) => ({
    name: entry.category,
    value: entry.count,
  }));

  const monthlyData = stats.monthlyPrompts.map((entry, index) => ({
    name: format(new Date(2024, entry.month - 1), 'MMM'), // Formatting months
    count: entry.count,
  }));

  const promptStatusData = stats.promptStatusCounts.map((entry, index) => ({
    name: entry.status.charAt(0).toUpperCase() + entry.status.slice(1),
    value: entry.count,
  }));

  const deviceUsageData = stats.deviceUsage.map((entry, index) => ({
    name: entry.model || entry.type,
    value: entry.count,
  }));

  const conversionFunnelData = stats.conversionFunnel.map((entry, index) => ({
    stage: entry.stage,
    count: entry.count,
  }));

  const userActivityData = stats.userActivity.map((entry, index) => ({
    date: format(new Date(entry.date), 'MMM d'), // Formatting dates
    count: entry.count,
  }));

  const COLORS = ['rgb(219, 194, 144)', 'rgb(218,177,141)', 'rgb(217,171,140)', 'rgb(216,160,138)', 'rgb(215,142,136)', 'rgb(214, 133, 134)'];

  return (
    <>
      <div className="flex gap-10">
        {/* Existing Charts */}
        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
          <h2 className='ml-3 text-2xl'>Prompt Approval Rate</h2>
          <p className="text-sm text-gray-400 ml-3 mb-5">Approval, rejection, and pending status of prompts.</p>
          <ResponsiveContainer width="85%" height="75%">
            <PieChart>
              <Pie data={promptStatusData} outerRadius={70} fill="#8884d8" label>
                {promptStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-5 rounded-lg">
          <h2 className='ml-3 text-2xl'>Category Distribution</h2>
          <p className="text-sm text-gray-400 ml-3 mb-5">Distribution of prompts across different categories.</p>
          <ResponsiveContainer width="85%" height="75%">
            <PieChart>
              <Pie data={categoryData} outerRadius={70} fill="#82ca9d" label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
          <h2 className='ml-3 text-2xl'>Monthly Prompts</h2>
          <p className="text-sm text-gray-400 ml-3 mb-5">Number of prompts created each month.</p>
          <ResponsiveContainer width="85%" height="75%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke={COLORS[3]} dot={{ stroke: 'rgb(219, 194, 144)', fill: 'rgb(219, 194, 144)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex gap-10">
        {/* New Charts */}
        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
          <h2 className='ml-3 text-2xl'>Device Usage</h2>
          <p className="text-sm text-gray-400 ml-3 mb-5">Distribution of prompts by device or model.</p>
          <ResponsiveContainer width="85%" height="75%">
            <PieChart>
              <Pie data={deviceUsageData} outerRadius={70} fill="#ff7300" label>
                {deviceUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
          <h2 className='ml-3 text-2xl'>Conversion Funnel</h2>
          <p className="text-sm text-gray-400 ml-3 mb-5">Stages of prompt submission, review, and approval.</p>
          <ResponsiveContainer width="85%" height="75%">
            <BarChart data={conversionFunnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={COLORS[5]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 w-[400px] h-[300px] bg-[rgb(57,57,84)] p-2 pt-3 rounded-lg">
          <h2 className='ml-3 text-2xl'>User Activity Heatmap</h2>
          <p className="text-sm text-gray-400 ml-3 mb-5">Activity levels of prompt creation or updates over time.</p>
          <ResponsiveContainer width="85%" height="75%">
            <LineChart data={userActivityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke={COLORS[3]} dot={{ stroke: 'rgb(216,160,138)', fill: 'rgb(216,160,138)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

