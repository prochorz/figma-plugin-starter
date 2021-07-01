---
to: "<% return path + kebabName + '.tsx'%>"
---
import React from 'react';
import cx from 'classnames';

import Style from './<%= kebabName %>.module.scss';

export interface Props {
    render?: any,
    className?: string,
    children?: JSX.Element[] | JSX.Element
}

const <%= pascalName %>: React.FC<Props> = (props) => {
    const { children, className = '' } = props;

    const ctxClass = cx(Style['<%= kebabName %>'], className);

    return (
        <div className={ ctxClass }>
            { children }
        </div>
    );
}

export default <%= pascalName %>;