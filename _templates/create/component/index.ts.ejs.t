---
to: "<%
 const baseComponentUrl = 'src/ui/components/';
 const componentTypeUrl = componentType + 's/';
 const prefix = componentType === 'unique-organism' ? 'o-' : componentType[0] + '-';
 const componentFolderName =  prefix + h.changeCase.kebab(componentName);
 return baseComponentUrl + componentTypeUrl + componentFolderName + '/index.ts'%>"
---
<%
    const prefix = componentType === 'unique-organism' ? 'o-' : componentType[0] + '-';
    const name = {
        kebab: h.changeCase.kebab(prefix + componentName),
        pascal: h.changeCase.pascal(prefix + componentName)
    }
%>import <%= name.pascal %>, { Props } from './<%= name.kebab %>';

export { <%= name.pascal %>, Props };
