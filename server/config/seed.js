/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({})
  .remove()
  .then(() => {
    var project1_Id,
      project1_acrn,
      project2_Id,
      project2_acrn;

    Thing.create({
        title: 'Project 1',
        type: 'project',
        acronym: 'P1',
        project: '0',
        active: true
      }, {
        title: 'Project 2',
        type: 'project',
        acronym: 'P2',
        project: '0',
        active: true
      })
      .then(() => {
        Thing.find({}, (err, itm) => {
            project1_Id = itm[0]._id;
            project1_acrn = itm[0].acronym;
            project2_Id = itm[1]._id;
            project2_acrn = itm[1].acronym;
          })
          .then(() => {
            Thing.create({
              title: 'Task 1-1',
              type: 'task',
              acronym: project1_acrn,
              project: project1_Id,
              active: true
            }, {
              title: 'Task 1-2',
              type: 'task',
              acronym: project1_acrn,
              project: project1_Id,
              active: true
            }, {
              title: 'Task 2-1',
              type: 'task',
              acronym: project2_acrn,
              project: project2_Id,
              active: true
            }, {
              title: 'Task 2-2',
              type: 'task',
              acronym: project2_acrn,
              project: project2_Id,
              active: false
            });
          });
      });
  });

User.find({})
  .remove()
  .then(() => {
    User.create({
        provider: 'local',
        title: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        title: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });
