import SQLite from 'react-native-sqlite-storage';
import {DB_NAME, DB_VERSION, DB_DISPLAY, DB_SIZE} from '@env';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = DB_NAME;
const database_version = DB_VERSION;
const database_displayname = DB_DISPLAY;
const database_size = DB_SIZE;

export default class Database {
  initDB() {
    let db;
    return new Promise((resolve) => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then((DB) => {
              db = DB;
              console.log('Database OPEN');
              db.executeSql('SELECT 1 FROM Namaz LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch((error) => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  db.transaction((tx) => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Namaz (namazDay, namazWeek, namazFajir, namazVosxod, namazZuhr, namazAsr, namazMagrib, namazIsha)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then((status) => {
          console.log('Database CLOSED');
        })
        .catch((error) => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  listProduct() {
    return new Promise((resolve) => {
      const namazs = [];
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT n.namazDay, n.namazWeek, n.namazFajir, n.namazVosxod, n.namazZuhr, n.namazAsr, n.namazMagrib, n.namazIsha FROM Namaz n',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(
                  `Namaz Day: ${row.namazDay}, 
                  Namaz Week: ${row.namazWeek}, 
                  Namaz Fajir: ${row.namazFajir}, 
                  Namaz Vozxod: ${row.namazVosxod}, 
                  Namaz Zuhr: ${row.namazZuhr}, 
                  Namaz Asr: ${row.namazAsr}, 
                  Namaz Magrib: ${row.namazMagrib}, 
                  Namaz Isha: ${row.namazIsha}`,
                );
                const {
                  namazDay,
                  namazWeek,
                  namazFajir,
                  namazVosxod,
                  namazZuhr,
                  namazAsr,
                  namazMagrib,
                  namazIsha,
                } = row;
                namazs.push({
                  namazDay,
                  namazWeek,
                  namazFajir,
                  namazVosxod,
                  namazZuhr,
                  namazAsr,
                  namazMagrib,
                  namazIsha,
                });
              }
              resolve(namazs);
            });
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  //   productById(id) {
  //     console.log(id);
  //     return new Promise((resolve) => {
  //       this.initDB()
  //         .then((db) => {
  //           db.transaction((tx) => {
  //             tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
  //               console.log(results);
  //               if (results.rows.length > 0) {
  //                 let row = results.rows.item(0);
  //                 resolve(row);
  //               }
  //             });
  //           })
  //             .then((result) => {
  //               this.closeDatabase(db);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }

  addProduct(nam) {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT INTO Namaz VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
              nam.namazDay,
              nam.namazWeek,
              nam.namazFajir,
              nam.namazVosxod,
              nam.namazZuhr,
              nam.namazAsr,
              nam.namazMagrib,
              nam.namazIsha,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              this.closeDatabase(db);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  //   updateProduct(id, prod) {
  //     return new Promise((resolve) => {
  //       this.initDB()
  //         .then((db) => {
  //           db.transaction((tx) => {
  //             tx.executeSql(
  //               'UPDATE Product SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ? WHERE prodId = ?',
  //               [prod.prodName, prod.prodDesc, prod.prodImage, prod.prodPrice, id],
  //             ).then(([tx, results]) => {
  //               resolve(results);
  //             });
  //           })
  //             .then((result) => {
  //               this.closeDatabase(db);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }

  //   deleteProduct(day) {
  //     return new Promise((resolve) => {
  //       this.initDB()
  //         .then((db) => {
  //           db.transaction((tx) => {
  //             tx.executeSql('DELETE FROM Namaz WHERE namazDay = ?', [id]).then(([tx, results]) => {
  //               console.log(results);
  //               resolve(results);
  //             });
  //           })
  //             .then((result) => {
  //               this.closeDatabase(db);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }
}
