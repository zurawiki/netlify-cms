import { Map } from 'immutable';
import { newEditorPlugin } from 'EditorWidgets/Markdown/MarkdownControl/plugins';

/**
 * Global Registry Object
 */
const registry = {
  backends: { },
  templates: {},
  templateParsers: {},
  previewStyles: [],
  widgets: {},
  editorComponents: Map(),
  widgetValueSerializers: {},
};

export default {
  registerPreviewStyle,
  getPreviewStyles,
  registerPreviewTemplate,
  getPreviewTemplate,
  registerTemplateParser,
  getTemplateParser,
  registerWidget,
  getWidget,
  resolveWidget,
  registerEditorComponent,
  getEditorComponents,
  registerWidgetValueSerializer,
  getWidgetValueSerializer,
  registerBackend,
  getBackend,
};


/**
 * Preview Styles
 *
 * Valid options:
 *  - raw {boolean} if `true`, `style` value is expected to be a CSS string
 */
export function registerPreviewStyle(style, opts) {
  registry.previewStyles.push({ ...opts, value: style });
};
export function getPreviewStyles() {
  return registry.previewStyles;
};


/**
 * Preview Templates
 */
export function registerPreviewTemplate(name, template, dataProvider, parserName) {
  registry.templates[name] = { template, dataProvider, parserName };
};
export function getPreviewTemplate(name) {
  return registry.templates[name];
};

/**
 * Preview Template Parsers
 */
export function registerTemplateParser(name, parser) {
  registry.templateParsers[name] = parser;
};
export function getTemplateParser(name) {
  return registry.templateParsers[name];
};

/**
 * Editor Widgets
 */
export function registerWidget(name, control, preview) {
  // A registered widget control can be reused by a new widget, allowing
  // multiple copies with different previews.
  const newControl = typeof control === 'string' ? registry.widgets[control].control : control;
  registry.widgets[name] = { control: newControl, preview };
};
export function getWidget(name) {
  return registry.widgets[name];
};
export function resolveWidget(name) {
  return getWidget(name || 'string') || getWidget('unknown');
};


/**
 * Markdown Editor Custom Components
 */
export function registerEditorComponent(component) {
  const plugin = newEditorPlugin(component);
  registry.editorComponents = registry.editorComponents.set(plugin.get('id'), plugin);
};
export function getEditorComponents() {
  return registry.editorComponents;
};


/**
 * Widget Serializers
 */
export function registerWidgetValueSerializer(widgetName, serializer) {
  registry.widgetValueSerializers[widgetName] = serializer;
};
export function getWidgetValueSerializer(widgetName) {
  return registry.widgetValueSerializers[widgetName];
};

/**
 * Backend API
 */
export function registerBackend(name, BackendClass) {
  if (!name || !BackendClass) {
    console.error("Backend parameters invalid. example: CMS.registerBackend('myBackend', BackendClass)");
  } else if (registry.backends[name]) {
      console.error(`Backend [${ name }] already registered. Please choose a different name.`);
  } else {
    registry.backends[name] = {
      init: config => new BackendClass(config),
    };
  }
}

export function getBackend(name) {
  return registry.backends[name];
}

