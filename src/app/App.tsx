import { useState } from 'react';
import { Todo } from '../components/Todo/TodoMain/Todo';
import './App.css';

export type DesignPropsType = {
    style: DesignType
    changeStyle: (string: DesignType) => void
}

type DesignType = "light" | "dark";

function App() {
    const [design, setDesign] = useState<DesignType>("light");

    return (
        <div className={design === 'dark' ? 'app dark' : 'app'}>
            <Todo style={design} changeStyle={setDesign} />
        </div>
    );
}

export default App;
