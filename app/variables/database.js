const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
    //   port: 5432,
      user : 'postgres',
      password : 'bogoss2018',
      database : 'control-union'
    },
    // pool: {nnnnnnnnnnnnnnnb² hb<wwsxw
    //   afterCreate: function (conn, done) {
    //     // in this example we use pg driver's connection API
    //     conn.query('SET timezone="UTC";', function (err) {
    //       if (err) {
    //         // first query failed, return error and don't try to make next query
    //         done(err, conn);
    //       } else {
    //         // do the second query...
    //         conn.query('SELECT set_limit(0.01);', function (err) {
    //           // if err is not falsy, connection is discarded from pool
    //           // if connection aquire was triggered by a query the error is passed to query promise
    //           done(err, conn);
    //         });
    //       }
    //     });
    //   }
    // }
  });

  
  module.exports = knex;