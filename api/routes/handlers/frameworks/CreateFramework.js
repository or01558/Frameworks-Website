import ResponseTypes from "../../constants/ResponseTypes.js";
import Errors from "../../constants/Errors.js";
import Framework from "../../database/models/Framework.js";

export default async function(request, response) {
  try {
    const { body } = request;
    const { type, name } = body;
    const frameworkId = IdGenerator.generateFrameworkId();
    await new Framework(frameworkId, type, name).save();
    return response.status(200).send(ResponseTypes[Errors.OPERATION_SUCCESS_WITH_VALUE]("Your Framework has been successfuly created!"));
  } catch (err) {
    return response.status(500).send(ResponseTypes[Errors.SERVER_ERROR](err.message));
  }
}