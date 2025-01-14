const { test, expect, beforeAll, afterAll} = require('@jest/globals');
const server = require('../server/server');
const request = require('supertest');
const article = require('./article')
const repositoryMock = require('../repository/__mocks__/repository');

let app = null

//Roda antes de todos os testes
beforeAll( async () =>{
    process.env.PORT = 3003
    app = await server.start(article, repositoryMock );
})


//Roda no final de cada teste
afterAll( async () =>{
    await server.stop()
})

test('GET /articles', async () =>{
    const response = await request(app).get('/articles')
    expect(response.status).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeTruthy()

})

test('GET /articles/:id', async () =>{
    const testMovieId = '1'
    const response = await request(app).get(`/articles/${testMovieId}`)
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy()
})

test('GET /articles/total', async () =>{
    const response = await request(app).get('/articles/total')
    expect(response.status).toEqual(200)
})

// test('POST /articles/new', async () =>{
    
// })

// test('PUT /articles/:id', async () =>{
    
// })

// test('DELETE /articles/:id', async () =>{
    
// })