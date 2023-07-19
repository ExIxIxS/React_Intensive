import { v4 as uuid } from 'uuid';

function addIdToObject<T>(obj: T): T & { id: string } {
  const objWithId = obj as T & { id: string };
  objWithId.id = uuid();

  return objWithId;
}

export { addIdToObject };
