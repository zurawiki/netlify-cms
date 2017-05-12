import React from 'react';

/* eslint-disable */
/**
 * The FIELD_ROLES constant houses data to help determine which fields from the
 * user's configuration can fill a particular role within the application. For
 * example, some kind of title is needed in the UI when displaying an entry,
 * but what if the collection for that entry has no field called "title"? The
 * data in FIELD_ROLES helps us find a suitable replacement.
 */
export const FIELD_ROLES = {
  title: {
    widget: 'string',
    secondaryWidgets: [],
    synonyms: ['title', 'name', 'label', 'headline', 'header'],
    defaultPreview: value => <h1>{ value }</h1>,
    fallbackToFirstField: true,
    showError: true,
  },
  shortTitle: {
    widget: 'string',
    secondaryWidgets: [],
    synonyms: ['short_title', 'shortTitle', 'short'],
    defaultPreview: value => <h2>{ value }</h2>,
    fallbackToFirstField: false,
    showError: false,
  },
  author: {
    widget: 'string',
    secondaryWidgets: [],
    synonyms: ['author', 'name', 'by', 'byline', 'owner'],
    defaultPreview: value => <strong>{ value }</strong>,
    fallbackToFirstField: false,
    showError: false,
  },
  description: {
    widget: 'string',
    secondaryWidgets: ['text', 'markdown'],
    synonyms: ['shortDescription', 'short_description', 'shortdescription', 'description', 'intro', 'introduction', 'brief', 'content', 'biography', 'bio', 'summary'],
    defaultPreview: value => value,
    fallbackToFirstField: false,
    showError: false,
  },
  image: {
    widget: 'image',
    secondaryWidgets: [],
    synonyms: ['image', 'thumbnail', 'thumb', 'picture', 'avatar', 'photo'],
    defaultPreview: value => value,
    fallbackToFirstField: false,
    showError: false,
  },
};

/**
 * selectFieldNameForRole accepts a collection and a role name, and returns
 * the name of the field that should be used for that role (or else null).
 *
 * The data for matching a role with a field is stored in the FIELD_ROLES
 * constant.
 */
export const selectFieldNameForRole = (collection, roleName) => {
  const role = FIELD_ROLES[roleName];
  const fields = collection.get('fields');

  // If the collection has no fields or the role doesn't exist in FIELD_ROLES,
  // return null
  if (!fields || !role) {
    return null;
  }

  // Get the names of all fields with the right kind of widget for the role
  // (FIELD_ROLES contains the widget selections for each role)
  const fieldNamesWithMatchingWidget = fields
    .filter(field => field.get('widget', 'string') === role.widget)
    .map(field => field.get('name'));

  // Of the fields with matching widgets, narrow down to the names that are
  // listed as synonyms for this role
  const matchingFieldNames = fieldNamesWithMatchingWidget
    .filter(fieldName => role.synonyms.includes(fieldName));

  // If any matches are found, return the first field name in the list
  if (!matchingFieldNames.isEmpty()) {
    return matchingFieldNames.first();
  }

  // Since no fields were found with the right name and widget, check against
  // the secondary widgets for this role
  const fieldNamesWithMatchingSecondaryWidget = fields
    .filter(field => role.secondaryWidgets.includes(field.get('widget', 'string')))
    .map(field => field.get('name'));

  // Narrow down to fields with names that are synonyms for this role
  const secondaryMatchingFieldNames = fieldNamesWithMatchingSecondaryWidget
    .filter(fieldName => role.synonyms.includes(fieldName));

  // If any matches are found, return the first field name in the list
  if (!secondaryMatchingFieldNames.isEmpty()) {
    return secondaryMatchingFieldNames.first();
  }

  // Lastly, if any field just has the right widget, return the first of those
  // (if the role has `fallbackToFirstField` set to true)
  if (role.fallbackToFirstField && !fieldNamesWithMatchingWidget.isEmpty()) {
    return fieldNamesWithMatchingWidget.first();
  }

  return null;
};
