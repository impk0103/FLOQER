import React from 'react';
import { Table } from 'antd';
import { salaryData } from '../data';

const MainTable = ({ onRowClick }) => {

  const columns = [
    { title: 'Year', dataIndex: 'year', key: 'year', sorter: (a, b) => a.year - b.year },
    { title: 'Number of Jobs', dataIndex: 'numJobs', key: 'numJobs', sorter: (a, b) => a.numJobs - b.numJobs },
    { title: 'Average Salary (USD)', dataIndex: 'avgSalary', key: 'avgSalary', sorter: (a, b) => a.avgSalary - b.avgSalary },
  ];

  const data = salaryData.reduce((acc, curr) => {
    const year = curr.work_year;
    if (!acc[year]) {
      acc[year] = { year, numJobs: 0, totalSalary: 0 };
    }
    acc[year].numJobs += 1;
    acc[year].totalSalary += curr.salary_in_usd;
    return acc;
  }, {});

  const tableData = Object.values(data).map(item => ({
    year: item.year,
    numJobs: item.numJobs,
    avgSalary: item.totalSalary / item.numJobs,
  }));

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      rowKey="year"
      onRow={(record) => ({
        onClick: () => {
          onRowClick(record.year);
        },
      })}
    />
  );
};

export default MainTable;
