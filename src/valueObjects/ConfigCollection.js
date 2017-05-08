import { Map } from 'immutable';

export default Map({
  files: [{
    description: 'CMS Configuration',
    file: 'config.yml',
    label: 'Configuration',
    name: 'config',
    fields: [{
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
        },
        {
          label: 'Repo',
          name: 'repo',
          widget: 'string',
        },
      ],
      label: 'Backend',
      name: 'backend',
      widget: 'object',
    }],
  }],
  label: 'Config',
  name: 'config',
  type: 'file_based_collection',
});
