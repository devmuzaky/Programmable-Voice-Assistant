import Command from "../models/Command";

export const createCommand = async (id, name, executable_path) => {
  return await Command.create({
    id: id,
    name: name,
    executable_path: executable_path,
  });
}
