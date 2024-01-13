"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list1 = exports.list = void 0;
var list = exports.list = function list(data) {
  var rl = [{
    name: 'collection',
    attributes: ['id', 'name', 'slug'],
    where: {},
    required: false
  }, {
    name: 'collection',
    attributes: ['id', 'name', 'slug'],
    where: {},
    required: false
  }, {
    name: 'tag',
    attributes: ['id', 'name', 'slug'],
    where: {},
    required: false
  }, {
    name: 'collection_collection',
    attributes: ['id'],
    where: {},
    require: true
  }, {
    name: 'collection_collection',
    attributes: ['id'],
    where: {},
    require: true
  }, {
    name: 'tag_collection',
    attributes: ['id'],
    where: {},
    require: true
  }];
  if (data.collectionId) {
    rl[0].where.id = parseInt(data.collectionId);
    rl[0].required = true;
  }
  if (data.collectionId) {
    rl[1].where.id = parseInt(data.collectionId);
    rl[1].required = true;
  }
  if (data.tagId) {
    rl[1].where.id = parseInt(data.tagId);
    rl[1].required = true;
  }
  return rl;
};
var list1 = exports.list1 = function list1() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rl = [{
    name: 'collection',
    attributes: ['id', 'name', 'slug'],
    where: {},
    required: false
  }, {
    name: 'collection',
    attributes: ['id', 'name', 'slug'],
    where: {},
    required: false
  }, {
    name: 'tag',
    attributes: ['id', 'name', 'slug'],
    where: {},
    required: false
  }];
  if (data.collectionId) {
    rl[0].where.id = parseInt(data.collectionId);
    rl[0].required = true;
  }
  if (data.collectionId) {
    rl[1].where.id = parseInt(data.collectionId);
    rl[1].required = true;
  }
  if (data.tagId) {
    rl[1].where.id = parseInt(data.tagId);
    rl[1].required = true;
  }
  return rl;
};