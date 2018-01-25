import { registerTemplateParser } from 'Lib/registry';
import templateParserHandlebars from 'Extensions/template-parser-handlebars';

registerTemplateParser('handlebars', templateParserHandlebars);
