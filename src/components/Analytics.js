import React, { useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Table } from 'antd';
import { salaryData } from '../data';
import MainTable from './MainTable';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const Analytics = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleRowClick = (year) => 
  {
    setSelectedYear(year);
  };

  const years = [...new Set(salaryData.map(item => item.work_year))];
  const jobCounts = years.map(year => salaryData.filter(item => item.work_year === year).length);

  const lineData = {
    labels: years.map(String), 
    datasets: [
      {
        label: 'Number of Jobs',
        data: jobCounts,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'green',
      },
    ],
  };

  const selectedYearData = selectedYear
    ? salaryData.filter(item => item.work_year === selectedYear)
    : [];

  const jobTitleCounts = selectedYearData.reduce((acc, curr) => {
    if (!acc[curr.job_title]) {
      acc[curr.job_title] = 0;
    }
    acc[curr.job_title] += 1;
    return acc;
  }, {});

  const secondaryTableData = Object.entries(jobTitleCounts).map(([jobTitle, count]) => ({
    jobTitle,
    count,
  }));

  const secondaryColumns = [
    { title: 'Job Title', dataIndex: 'jobTitle', key: 'jobTitle' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
  ];

  return (
    <div>
      <MainTable onRowClick={handleRowClick} />

      <div style={{ marginTop: 20 }}>

        <h2>Number of Jobs Over Time</h2>
        <Line data={lineData} />

      </div>

      {selectedYear && (
        
        <div style={{ marginTop: 20 }}>
          <h2>Job Titles for {selectedYear}</h2>
          <Table
            columns={secondaryColumns}
            dataSource={secondaryTableData}
            rowKey="jobTitle"
          />
        </div>

      )}
    </div>
  );
};

export default Analytics;
