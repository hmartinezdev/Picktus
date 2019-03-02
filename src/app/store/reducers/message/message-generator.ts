import uuid from 'uuid';
import { IPicktusError, IPicktusMessage, PicktusMessageLevel } from './message.type';

/**
 * Function formating error and message and adding an unique ID
 *
 * @param  {string} text
 * @param  {PicktusMessageLevel} level
 * @returns IPicktusError
 */
export default function(text: string, level: PicktusMessageLevel): IPicktusError | IPicktusMessage {
  return {
    id: uuid.v4(),
    level,
    text,
  };
}
