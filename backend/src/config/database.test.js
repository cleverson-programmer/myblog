const { test, expect } = require('@jest/globals')
const database = require('./database')

test('Connecting Database', async () => {
    const connection = await database.connect()
    expect(connection).toBeTruthy()
})

test('Disconnecting Database', async () => {
    const isDisconnection = await database.disconnect()
    expect(isDisconnection).toBeTruthy()
})

test('Disconnecting Database 2x', async () => {
    await database.disconnect();
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})

test('Acess to valid collection', async () => {
    const db = await database.connect();
    const collection = db.collection('articles');
    expect(collection).toBeTruthy();
    expect(typeof collection.find).toBe('function');
});
