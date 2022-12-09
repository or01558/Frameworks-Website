import JsonMessages from "../../constants/JsonMessages.js";

import Framework from "../../database/models/Framework.js";

export default async function(request, response) {
  try {
    const { body } = request;
    const { frameworkId } = body;
    const framework = Framework.getById(frameworkId);
    if(!framework) return ResponseTypes[Errors.TARGET_OBJECT_ISNULL]("Framework Not Found", "Invalid Framework's Id", "Valid Framework's Id");
    
    return response.status(200).send(ResponseTypes[Errors.OPERATION_SUCCESS_WITH_VALUE]("Your Framework has been successfuly removed!"));
  } catch (err) {
    return response.status(500).send(JsonMessages.serverError(err.message));
  }
}