const request = require('supertest')

const db = require('./data/db-config')
const server = require('./server.js')

const Users = require('./users/users-model')

beforeEach(async () => {
    await db('Users').truncate()
    await db('Foods_Eaten').truncate()
    await db('Foods').truncate()
    await db('Categories').truncate()
    await db('Pets').truncate()
})


describe("Server tests", () => {
    describe('Index router', () => {
        it('Should return a status of 200 at the base route.', async () => {
            const expectedCode = 200;
            const response = await request(server).get('/')
            expect(response.status).toEqual(expectedCode)
        });

        it('Should return JSON greeting from base route.', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');
        });

        it('Should return status 201 Created user', async () => {
            const user = { 
                username: "Testing1",
                password: 'password1'
            }

            const response = await request(server).post('/auth/register').send(user)
            expect(response.status).toEqual(201)
        })

        it('Should sign in with user and add a pet', async () => {
            const user = {
                username: "Testing1",
                password: 'password1'
            }

            const pet = {
                pet_name: "Doggo"
            }

            await request(server).post('/auth/register').send(user)
            await request(server).post('/auth/login').send(user)
            const response = await request(server).post('/auth/user/1/pet').send(pet)
            expect(response.status).toEqual(200)
        })

        it('Should post a food to the test user profile', async () => {
            const user = {
                username: "Testing1",
                password: 'password1'
            }

            const pet = {
                pet_name: "Doggo"
            }

            const food = {
                name: "Steak",
                category_id: 3,
            }

            await request(server).post('/auth/register').send(user)
            await request(server).post('/auth/login').send(user)
            await request(server).post('/auth/user/1/pet').send(pet)
            const response = await request(server).post('/auth/user/1/pet/1/foods').send(food)
            expect(response.status).toEqual(200)
        })
    })

    describe('Testing the DB', () => {
        it('Should create 2 new users', async () => { // PASSES
            await Users.addUser({ username: "Testing1", password: "Testing1" })
            await Users.addUser({ username: "Testing2", password: "Testing2" })

            const getUsers = await db('Users')
            expect(getUsers).toHaveLength(2)
        })
    })
});