import React from 'react';
import FlybookTable from '../components/FlybookTable';
import { useSearchParams } from 'react-router-dom';

const FlybookTablePage: React.FC = () => {
  // 获取URL查询参数中的workId
  const [searchParams] = useSearchParams();
  const workId = searchParams.get('workId');
  
  return (
    <div className="min-h-screen bg-white">
      <FlybookTable workId={workId || undefined} />
    </div>
  );
};

export default FlybookTablePage;