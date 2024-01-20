`use admin`;
db.createUser(
    {
        user: "mongo",
        pwd: "password",
        roles: [{role: "userAdminAnyDatabase", db: "admin"}]
    }
);

`use chat_db`;
db.createUser(
    {
        user: "mongo",
        pwd: "password",
        roles: [{role: "dbOwner", db: "chat_db"}]
    }
);