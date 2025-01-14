const database = require('../config/database');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const { ADMIN_PROFILE } = require('../middlewares/validationMiddlewares');
const { GUEST_PROFILE } = require('../middlewares/validationMiddlewares');

//retorna todos os users
async function getAllUsers() {
    const db = await database.connect()

    return db.collection('users').find().toArray();
}

//retorna user por id
async function getUserId(id) {
    const db = await database.connect();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
}

const PAGE_SIZE = 5
//retorna os users paginados
async function findUsers(page = 1){

    const totalSkip = (page - 1) * PAGE_SIZE
    
    const db = await database.connect();
    return db
            .collection('users')
            .find({})
            .skip(totalSkip)
            .limit(PAGE_SIZE)
            .toArray()
}

//retorna quantidade de users
async function countUsers() {
    const db = await database.connect();
    const count = await db.collection('users').countDocuments();
    return count;
}

//atualiza user
async function updateUser(id, user){
    //Retorna o JSON com as informações
    const db = await database.connect();
    return db
            .collection("users")
            
            .updateOne({ _id: new ObjectId(id)}, { $set: user})
}

//deleta users
async function deleteUser(id){
    const db = await database.connect();
    return db
            .collection("users")
            .deleteOne({_id: new ObjectId(id)})
}

//Login and logout users

//busca user por email e senha, compara a senha vinda de texto plano com a criptografada no banco de dados se for valida retorna o usuário
async function getUser(email, password) {
    const db = await database.connect();

    const user = await db.collection('users')
        .findOne({ email })

    if(!user) throw new Error('Wrong user and/or password')

    //Se veio a senha, fazemos a comparação para ver se bate com a criptografia
    //Passa a senha do texto plano vinda da requisição e passa a senha criptografada do banco de dados, a criptografia hash de senha não consegue retornar a senha original digitada pelo usuário, mas consegue comparar se duas criptografias são iguais
    const isValid = bcrypt.compareSync(password, user.password)
    if(!isValid) throw new Error('Wrong user and/or password')

    return user
}

//Fn que insere users comuns no banco de dados
async function insertUser(user) {
    const db = await database.connect();

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    user.password = hashedPassword;

    //Garante que o profile id seja sempre 2 (usuário guest)
    user.profileId = GUEST_PROFILE;

    return db
        .collection('users')
        .insertOne(user);
}

//Fn que insere users com permissões de ADMIN no banco
async function insertAdminUser(user){
    const db = await database.connect();

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    user.password = hashedPassword;

    // Garante que o profileId seja sempre 1 (admin)
    user.profileId = ADMIN_PROFILE

    return db
        .collection('users')
        .insertOne(user);
}

//Para não sobrecarregar o banco com todos os tokens blacklistados na hora do logout, nós vamos adicionar um padrão ao mongodb chamado (TTL) Time To Live Index que a partir de um determinado tempo apaga automaticamente os dados do banco, já que esse nosso token JWT já tem a expiração programada de 30 minutos. Essa configuração faz no mongodb compass, na aba indexes, tem criar um indice, passar a ordem crescente e nas options passar create TTL, esse  TTL fica armazenado automaticamente e a propria engine do mongodb monitora esse index
async function blackListToken(token){
    const db = await database.connect()

    return await db.collection('blackList')
        .insertOne({ _id: token, data: new Date()})
    
}

async function checkBlackList(token){
    const db = await database.connect()

    const qtd = await db.collection('blackList')
        .countDocuments({ _id: token})
    return qtd > 0
    
}

module.exports = {
    getAllUsers,
    getUserId,
    findUsers,
    countUsers,
    insertUser,
    updateUser,
    deleteUser,

    getUser,
    insertAdminUser,
    blackListToken,
    checkBlackList
}