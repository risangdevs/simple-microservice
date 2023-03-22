const { getDatabase } = require("../config/mongo");
const mongo = require("mongodb");
const mysqlConnection = require("../config/mysql");

class Item {
  static add(data) {
    return getDatabase().collection("items").insertOne(data);
  }
  static findAll() {
    return getDatabase().collection("items").find().toArray();
  }
  static findByPk(id) {
    const o_id = new mongo.ObjectId(id);
    return getDatabase().collection("items").findOne({ _id: o_id });
  }
  static delete(id) {
    const o_id = new mongo.ObjectId(id);
    return getDatabase().collection("items").deleteOne({ _id: o_id });
  }
  static edit(id, data) {
    const o_id = new mongo.ObjectId(id);
    return getDatabase()
      .collection("items")
      .updateOne(
        { _id: o_id },
        {
          $set: {
            title: data.title,
            description: data.description,
          },
        }
      );
  }
  static async backup() {
    try {
      const data = await getDatabase().collection("items").find().toArray();

      console.log(`Retrieved ${data.length} documents from MongoDB`);

      // Connect to MySQL
      await new Promise((resolve, reject) => {
        mysqlConnection.connect((err) => {
          if (err) reject(err);
          console.log("Connected to MySQL!");
          resolve();
        });
      });

      const unique = new Date().getTime();
      const tableName = `items_${unique}`;

      // Create MySQL schema
      await new Promise((resolve, reject) => {
        mysqlConnection.query(
          `CREATE TABLE IF NOT EXISTS ${tableName} (id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), description VARCHAR(255))`,
          (err, result) => {
            if (err) reject(err);
            console.log("MySQL schema created");
            resolve();
          }
        );
      });

      // Insert data into MySQL
      await Promise.all(
        data.map((doc) => {
          return new Promise((resolve, reject) => {
            mysqlConnection.query(
              `INSERT INTO ${tableName} (id, title, description) VALUES ('${doc._id}', '${doc.title}', '${doc.description}')`,
              (err, result) => {
                if (err) {
                  reject(err);
                  setTimeout(() =>
                    mysqlConnection.query(
                      `DROP TABLE IF EXISTS ${tableName}`,
                      (err) => {
                        console.log("table dropped");
                      }
                    )
                  );
                }
                console.log(
                  `Inserted document with name ${doc.title} into MySQL`
                );
                resolve(result);
              }
            );
          });
        })
      );

      // Close MySQL connection
      await new Promise((resolve, reject) => {
        mysqlConnection.end((err) => {
          if (err) reject(err);
          console.log("MySQL connection closed");
          resolve();
        });
      });
      return { message: "Success" };
    } catch (e) {
      throw e;
    }
  }
}
module.exports = Item;
