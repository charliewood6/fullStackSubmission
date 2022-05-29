const supertest = require('supertest')
const express = require('express')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./userTest_helper')

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(helper.initialUsers[0])
    await userObject.save()
    userObject = new User(helper.initialUsers[1])
    await userObject.save()
  })


describe('invalid user testing', () => {
    test('username is missing', async () => {
        const userWithNoUsername = {
            name: "James Smith",
            password: '123456'
        }
        
        await api
          .post('/api/users')
          .send(userWithNoUsername)
          .expect(400)

        const finalUsers = await helper.usersInDb()
        expect(finalUsers).toHaveLength(helper.initialUsers.length)
    })

    test('password is missing', async () => {
        const userWithNoPassword = {
            username: 'jSmith12',
            name: "James Smith"
          }
        
          await api
          .post('/api/users')
          .send(userWithNoPassword)
          .expect(400)

          const finalUsers = await helper.usersInDb()
          expect(finalUsers).toHaveLength(helper.initialUsers.length)
    })

    test('password is too short', async () => {
        const userWithShortPassword = {
            username: 'jSmith12',
            name: "James Smith",
            password: '12'
          }
        
          await api
          .post('/api/users')
          .send(userWithShortPassword)
          .expect(400)

          const finalUsers = await helper.usersInDb()
          expect(finalUsers).toHaveLength(helper.initialUsers.length)
    })

    test('username is too short', async () => {
        const userWithShortUsername = {
            username: 'js',
            name: "James Smith",
            password: '123456'
          }
        
          await api
          .post('/api/users')
          .send(userWithShortUsername)
          .expect(400)

          const finalUsers = await helper.usersInDb()
          expect(finalUsers).toHaveLength(helper.initialUsers.length)
    })

})