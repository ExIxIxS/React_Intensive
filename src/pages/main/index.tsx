import { useSelector } from 'react-redux';
import Table from 'src/components/shared/table';
import { selectTableData } from 'src/store/features/tableDataSlice';

function Main(): JSX.Element {
  const tableData = useSelector(selectTableData);

  return (
    <div className="page main-page">
      <Table data={tableData} />
    </div>
  );
}

export default Main;
