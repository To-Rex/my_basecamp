const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = `mongodb+srv://doubleh:MyBasecamp003@mybasecamp.osrfmdb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const Register = async (user) => {
  const { email, password, name, sign_in } = user;
  console.log(email, password, name, sign_in);
  try {
    await client.connect();
    const check = await client
      .db("my_basecamp")
      .collection("users")
      .findOne({ email });
    if (typeof check === "string") {
      console.log("User already exist:", email);
      console.log("error");
      return "User already exist.";
    } else {
      const result = await client
        .db("my_basecamp")
        .collection("users")
        .insertOne(user);
      return result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const CheckEmail = async (email, status, password) => {
  try {
    await client.connect();
    const result = await client
      .db("my_basecamp")
      .collection("users")
      .findOne({ email });

    const check = await bcrypt.compare(password, result.password);
    if (check) {
      await client
        .db("my_basecamp")
        .collection("users")
        .updateOne({ email }, { $set: status });
    } else {
      return "Email or password is incorrect";
    }
    console.log(check, result);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const FindUser = async (id) => {
  try {
    await client.connect();
    const result = await client
      .db("my_basecamp")
      .collection("users")
      .find(ObjectId(id));

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const DeleteUser = async (id) => {
  try {
    await client.connect();
    const result = await client
      .db("my_basecamp")
      .collection("users")
      .deleteOne(Object(id));

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const SingOut = async (id) => {
  try {
    await client.connect();
    const result = await client
      .db("my_basecamp")
      .collection("users")
      .updateOne(ObjectId(id), { $set: { sign_in: false } });

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const CreateProject = async (name, id, description) => {
  try {
    await client.connect();
    const result = await client
      .db("my_basecamp")
      .collection("projects")
      .insertOne({ name, id, description });
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.clsoe();
  }
};

const CreatedByMe = async (id) => {
  try {
    await client.connect();
    const result = await client
      .db("my_basecamp")
      .collection("projects")
      .find(ObjectId(id));
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const UpdateProjectName = async (name) => {
  try {
    await client.connect();
    const result = await client
      .db("my_basecamp")
      .collection("projects")
      .updateOne({ name }, { $set: { name: name } });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

exports.Register = Register;
exports.CheckEmail = CheckEmail;
exports.FindUser = FindUser;
exports.DeleteUser = DeleteUser;
exports.SignOut = SingOut;
exports.CreateProject = CreateProject;
exports.CreatedByMe = CreatedByMe;
exports.UpdateProjectName = UpdateProjectName;
