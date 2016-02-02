"use strict";

exports.availableDocumentFeatures = [
  "FetchExternalResources",
  "ProcessExternalResources",
  "MutationEvents",
  "SkipExternalResources"
];

exports.defaultDocumentFeatures = {
  FetchExternalResources: ["script", "link"/*, "img", "css", "frame"*/],
  ProcessExternalResources: ["script"/*, "frame", "iframe"*/],
  MutationEvents: "2.0",
  SkipExternalResources: false
};

exports.applyDocumentFeatures = function (doc, features) {
  features = features || {};

  for (var i = 0; i < exports.availableDocumentFeatures.length; ++i) {
    var featureName = exports.availableDocumentFeatures[i];
    var featureSource;

    if (features[featureName] !== undefined) {
      featureSource = features[featureName];
      // We have to check the lowercase version also because the Document feature
      // methods convert everything to lowercase.
    } else if (typeof features[featureName.toLowerCase()] !== "undefined") {
      featureSource = features[featureName.toLowerCase()];
    } else if (exports.defaultDocumentFeatures[featureName]) {
      featureSource = exports.defaultDocumentFeatures[featureName];
    } else {
      continue;
    }

    doc.implementation._removeFeature(featureName);

    if (featureSource !== undefined) {
      if (Array.isArray(featureSource)) {
        for (var j = 0; j < featureSource.length; ++j) {
          doc.implementation._addFeature(featureName, featureSource[j]);
        }
      } else {
        doc.implementation._addFeature(featureName, featureSource);
      }
    }
  }
};
