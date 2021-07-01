/* globals require */

const changeCase = require('change-case');

const PREFIX_TYPES = {
    atom: 'a-',
    molecule: 'm-',
    organism: 'o-',
    'unique-organism': 'o-',
    template: 't-',
    page: 'p-'
};

const INPUTS = {
    COMPONENT_TYPE: {
        type: 'select',
        name: 'componentType',
        message: 'What type of component do you want to create?',
        choices: Object.keys(PREFIX_TYPES)
    },
    COMPONENT_NAME: {
        type: 'input',
        name: 'componentName',
        message: 'Type component name(without prefix). Example: remote-select or RemoteSelect',
        validate(value) {
            const fileName = changeCase.kebab(value);
            const prefix = fileName.substring(0, 2);
            const forbiddenPrefixes = Object.values(PREFIX_TYPES);
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
        }
    }
};

module.exports = {
    prompt: async ({ inquirer }) => {
        // STEP 1
        const { componentType } = await inquirer.prompt([INPUTS.COMPONENT_TYPE]);
        const isAddStory = !['template', 'page', 'unique-organism'].includes(componentType);

        // STEP 2
        const { componentName } = await inquirer.prompt([INPUTS.COMPONENT_NAME]);

        const kebabName = changeCase.kebab(PREFIX_TYPES[componentType] + componentName);
        const pascalName = changeCase.pascal(PREFIX_TYPES[componentType] + componentName);
        const path = `src/ui/components/${componentType}s/${kebabName}/`;

        return {
            path,
            kebabName,
            pascalName,
            isAddStory,
            componentType
        };
    }
};
