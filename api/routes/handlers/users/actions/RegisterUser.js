import User from "../../../../database/models/User.js";
import ResponseTypes from "../../../../constants/ResponseTypes.js";
import Errors from "../../../../constants/Errors.js";

export function getPage(request, response) {
  return response.render("register");
}

export async function register(request, response) {
  const locals = { email, username, password, message: ResponseTypes[Errors.OPERATION_SUCCESS_WITH_VALUE]("Your User has been successfuly created!"), error: false };
  try {
    const body = request.body;
    const { email, username, password } = body;
    const userId = await User.generateNewId();
    const user = new User(userId, email, username, password);
    await user.save();
  } catch (err) {
    locals.message = ResponseTypes[Errors.SERVER_ERROR](err.message);
    locals.error = true;
  } finally {
    return response.render("register", locals);
  }
}