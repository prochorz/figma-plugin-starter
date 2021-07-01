---
to: "<% return path + 'index.ts'%>"
---
import <%= pascalName %>, { Props } from './<%= kebabName %>';

export { <%= pascalName %>, Props };
