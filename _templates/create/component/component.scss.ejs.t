---
to: "<%
 const baseComponentUrl = 'src/ui/components/';
 const componentTypeUrl = componentType + 's/';
 const prefix = componentType === 'unique-organism' ? 'o-' : componentType[0] + '-';
 const componentFolderName =  prefix + h.changeCase.kebab(componentName);
 return baseComponentUrl + componentTypeUrl + componentFolderName + '/' + componentFolderName + '.module.scss'%>"
---
<%
    const prefix = componentType === 'unique-organism' ? 'o-' : componentType[0] + '-';
    const name = {
        kebab: h.changeCase.kebab(prefix + componentName),
        pascal: h.changeCase.pascal(prefix + componentName)
    }
%>@import "../../../assets/styles/mixins";
@import "../../../assets/styles/variables";

.<%= name.kebab %> {}
