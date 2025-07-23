import useStore from 'src/store';
import { Button } from '@gravity-ui/uikit';
import CreatePage from 'src/pages/create';
import './App.css';

// const SubmitButton = <Button view="action" size="l" />;
function App() {
  const color = useStore(({ today }) => today.color);

  return (
    <div className="app" style={{ backgroundColor: color }}>
      <CreatePage />
      <Button view="action" size="m">
        button
      </Button>
    </div>
  );
}

export default App;
