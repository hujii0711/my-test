import React from 'react';

const AppComponent = () => {
  const onAddChild = event => {
    const selector = document.querySelector('#children-pane');
    console.log(selector);
    event.preventDefault();
    selector.append(<ChildComponent />);
  };

  return (
    <div className="card calculator">
      <p>
        <a href="#" onClick={onAddChild}>
          Add Another Child Component
        </a>
      </p>
      <div id="children-pane"></div>
    </div>
  );
};

const ChildComponent = props => <div>{'I am child '}</div>;

export default AppComponent;
