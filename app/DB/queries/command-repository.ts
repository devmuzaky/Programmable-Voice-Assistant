import Command from "../models/Command";

export const createCommand = async (id, name, executable_path) => {
  return await Command.upsert({
    id: id,
    name: name,
    executable_path: executable_path,
  });
}

export const deleteCommand = async (id) => {
  return await Command.destroy({
    where: {
      id: id,
    },
  });
}
