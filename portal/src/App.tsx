import './App.css';
import { LavaCanvas } from "./LavaCanvas";
import { ToDo } from './ToDo';

export const App = () => {
  return (
    <>
      <LavaCanvas />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ToDo />
      </div>
    </>
  );
}
