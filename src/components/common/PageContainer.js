import React from 'react';

const PageContainer = props => {
    const {componentClass} = props;
    return <div className={"page-container " + componentClass}>
        {props.children}
    </div>
}

export default PageContainer;