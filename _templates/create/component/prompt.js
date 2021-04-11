const _ = require('lodash');

module.exports = [
  {
    type: 'select',
    name: 'componentType',
    message: 'What type of component do you want to create?',
    choices: ['atom', 'molecule', 'organism', 'unique-organism', 'template', 'page'],
  },
  {
    type: 'input',
    name: 'componentName',
    message: 'Type component name(without prefix). Example: remote-select or RemoteSelect',
    validate(value) {
      const fileName = _.kebabCase(value);
      const prefix = fileName.substring(0, 2);
      const forbiddenPrefixes = ['a-', 'm-', 'o-', 't-', 'p-'];
      if (!value.length) {
        return 'Components should have a name!!!';
      }
      if (value.length < 4) {
        return 'Component name should contain at least 4 symbols!!!';
      }
      if (forbiddenPrefixes.includes(prefix)) {
        return 'No prefixes allowed!!! Prefix will be added automatically based on component type!!!';
      }
      return true;
    },
  },
];
