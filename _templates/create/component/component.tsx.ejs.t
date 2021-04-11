---
to: "<%
 const baseComponentUrl = 'src/ui/components/';
 const componentTypeUrl = componentType + 's/';
 const prefix = componentType === 'unique-organism' ? 'o-' : componentType[0] + '-';
 const componentFolderName =  prefix + h.changeCase.kebab(componentName);
 return baseComponentUrl + componentTypeUrl + componentFolderName + '/' + componentFolderName + '.tsx'%>"
---
<%
    const prefix = componentType === 'unique-organism' ? 'o-' : componentType[0] + '-';
    const name = {
        kebab: h.changeCase.kebab(prefix + componentName),
        pascal: h.changeCase.pascal(prefix + componentName)
    }
%>import React from 'react';
import cx from 'classnames';

import Style from './<%= name.kebab %>.module.scss';

export interface Props {
    render?: any,
    className?: string,
    children?: JSX.Element[] | JSX.Element
}

export default function <%= name.pascal %>(props: Props) {
    const { children, className } = props;

    const ctxClass = cx(Style['<%= name.kebab %>'], className);

    return (
        <div className={ ctxClass }>
            { children }
        </div>
    );
}