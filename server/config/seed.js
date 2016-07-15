/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      title: 'Project A',
      type: 'project',
      parent: '',
      acronym: 'PRA',
      order: 0,
      active: true
    }, {
      title: 'Project B',
      type: 'project',
      parent: '',
      acronym: 'PRB',
      order: 0,
      active: true
    }, {
      title: 'Task A.1',
      type: 'task',
      parent: 'Project A',
      acronym: 'PRA',
      order: 0,
      active: true
    }, {
      title: 'Task A.2',
      type: 'task',
      parent: 'Project A',
      acronym: 'PRA',
      order: 0,
      active: true
    }, {
      title: 'Task B.1',
      type: 'task',
      parent: 'Project B',
      acronym: 'PRB',
      order: 0,
      active: true
    }, {
      title: 'Task B.2',
      type: 'task',
      parent: 'Project B',
      acronym: 'PRB',
      order: 0,
      active: true
    })
    .then(() => {
      // var a = Thing.find({title:'Project A'})
      // .then(() => {
      //   console.log('id=',a);
      // });
    });
  });

// var projectA = Thing.find({title:'Project A'})._id;
// var projectB = Thing.find({title:'Project B'})._id;
// Thing.update({parent:'Project B'}, {$set: {parent:Thing.find({title:'Project B'})._id.str}},false,true);
// Thing.update({parent:'Project B'}, {$set: {parent:projectB.str}},false,true);

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
