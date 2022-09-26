import React, {useState} from 'react';

const AppComponent = () => {
  const [numChildren, setNumChildren] = useState(0);

  const onAddChild = () => {
    setNumChildren(numChildren + 1);
  };

  const arr = [];
  for (var i = 0; i < numChildren; i += 1) {
    arr.push(<ChildComponent key={i} number={i} />);
  }

  return <ParentComponent addChild={onAddChild}>{arr}</ParentComponent>;
};

const ParentComponent = ({addChild, children}) => (
  <div className="card calculator">
    <p>
      <a href="#" onClick={addChild}>
        Add Another Child Component
      </a>
    </p>
    <div id="children-pane">
      {children} {/* 동적 추가되는 부분 */}
    </div>
  </div>
);

const ChildComponent = props => <div>{'I am child ' + props.number}</div>;

export default AppComponent;
